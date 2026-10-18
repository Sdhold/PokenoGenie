(function () {
    "use strict";

    var config;
    var token = "";
    var refreshToken = "";
    var tokenExpiresAt = 0;
    var roomCode = "";
    var pollTimer;
    var lastSignature = "";
    var codePattern = /^[A-HJ-NP-Z2-9]{8}$/;
    var patternNames = {
        standard: "Standard bingo", horizontal: "Horizontal line", vertical: "Vertical line",
        diagonal: "Diagonal line", h: "H", c: "C", x: "X", plus: "Plus",
        corners: "Four corners", perimeter: "Perimeter", blackout: "Full board"
    };
    var suitSymbols = { S: "♠", H: "♥", D: "♦", C: "♣" };
    var suitNames = { S: "Spades", H: "Hearts", D: "Diamonds", C: "Clubs" };
    var rankNames = {
        A: "Ace", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
        "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", "10": "Ten",
        J: "Jack", Q: "Queen", K: "King"
    };

    function byId(id) { return document.getElementById(id); }
    function setText(id, value) { byId(id).textContent = value; }
    function clearChildren(element) {
        while (element.firstChild) element.removeChild(element.firstChild);
    }
    function storedRefreshToken(value) {
        try {
            if (value) sessionStorage.setItem("pokeno.tvRefreshToken", value);
            else return sessionStorage.getItem("pokeno.tvRefreshToken") || "";
        } catch (error) { return ""; }
        return value;
    }
    function request(method, url, body, headers, callback) {
        var xhr = new XMLHttpRequest();
        var completed = false;
        function finish(status, data) {
            if (completed) return;
            completed = true;
            callback(status, data);
        }
        xhr.open(method, url, true);
        xhr.timeout = 12000;
        if (headers) {
            for (var name in headers) {
                if (Object.prototype.hasOwnProperty.call(headers, name)) {
                    xhr.setRequestHeader(name, headers[name]);
                }
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            var data = null;
            try { data = JSON.parse(xhr.responseText); } catch (error) { /* Error text can be plain HTML. */ }
            finish(xhr.status, data);
        };
        xhr.onerror = function () { finish(0, null); };
        xhr.ontimeout = function () { finish(0, null); };
        xhr.send(body || null);
    }
    function authError(data) {
        if (data && data.error && data.error.message) return data.error.message;
        return "Check the TV's internet connection and try again.";
    }
    function saveToken(data) {
        token = data.idToken || data.id_token || "";
        refreshToken = data.refreshToken || data.refresh_token || "";
        tokenExpiresAt = Date.now() + (Number(data.expiresIn || data.expires_in) || 3600) * 1000 - 120000;
        if (refreshToken) storedRefreshToken(refreshToken);
    }
    function signIn(callback) {
        var url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + encodeURIComponent(config.apiKey);
        request("POST", url, JSON.stringify({ returnSecureToken: true }),
            { "Content-Type": "application/json" }, function (status, data) {
                if (status === 200 && data && data.idToken) {
                    saveToken(data);
                    callback(null);
                } else callback("TV sign-in failed. " + authError(data));
            });
    }
    function refreshSignIn(callback) {
        if (!refreshToken) refreshToken = storedRefreshToken();
        if (!refreshToken) { signIn(callback); return; }
        var url = "https://securetoken.googleapis.com/v1/token?key=" + encodeURIComponent(config.apiKey);
        var body = "grant_type=refresh_token&refresh_token=" + encodeURIComponent(refreshToken);
        request("POST", url, body, { "Content-Type": "application/x-www-form-urlencoded" },
            function (status, data) {
                if (status === 200 && data && data.id_token) {
                    saveToken(data);
                    callback(null);
                } else {
                    refreshToken = "";
                    signIn(callback);
                }
            });
    }
    function ensureSignIn(callback) {
        if (token && Date.now() < tokenExpiresAt) callback(null);
        else refreshSignIn(callback);
    }
    function schedulePoll(delay) {
        clearTimeout(pollTimer);
        if (roomCode) pollTimer = setTimeout(poll, delay);
    }
    function showJoin(message) {
        byId("display-screen").hidden = true;
        byId("join-screen").hidden = false;
        setText("join-message", message || "");
    }
    function showDisplay() {
        byId("join-screen").hidden = true;
        byId("display-screen").hidden = false;
    }
    function cardInfo(id) {
        if (typeof id !== "string") return null;
        var match = /^(A|[2-9]|10|J|Q|K)([SHDC])$/.exec(id);
        if (!match) return null;
        return { rank: match[1], suit: suitSymbols[match[2]], name: rankNames[match[1]] + " of " + suitNames[match[2]], red: match[2] === "H" || match[2] === "D" };
    }
    function makeCard(id, large) {
        var element = document.createElement("div");
        var info = cardInfo(id);
        element.className = "tv-card" + (large ? " large" : "") + (info && info.red ? " red" : "");
        element.setAttribute("role", "img");
        if (!info) {
            element.className += " back";
            element.setAttribute("aria-label", "Face-down card");
            var logo = document.createElement("span");
            logo.textContent = "PG";
            element.appendChild(logo);
        } else {
            element.setAttribute("aria-label", info.name);
            var art = document.createElement("img");
            art.className = "card-art";
            art.src = "cards/" + id + ".svg";
            art.alt = "";
            art.draggable = false;
            element.appendChild(art);
        }
        return element;
    }
    function isFilled(pattern, row, column) {
        if (pattern === "standard" || pattern === "horizontal") return row === 0;
        if (pattern === "vertical") return column === 0;
        if (pattern === "diagonal") return row === column;
        if (pattern === "h") return column === 0 || column === 4 || row === 2;
        if (pattern === "c") return row === 0 || row === 4 || column === 0;
        if (pattern === "x") return row === column || row + column === 4;
        if (pattern === "plus") return row === 2 || column === 2;
        if (pattern === "corners") return (row === 0 || row === 4) && (column === 0 || column === 4);
        if (pattern === "perimeter") return row === 0 || row === 4 || column === 0 || column === 4;
        return pattern === "blackout";
    }
    function renderPattern(pattern) {
        var grid = byId("pattern-grid");
        clearChildren(grid);
        for (var row = 0; row < 5; row++) {
            for (var column = 0; column < 5; column++) {
                var cell = document.createElement("span");
                if (isFilled(pattern, row, column)) cell.className = "filled";
                grid.appendChild(cell);
            }
        }
    }
    function drawnCards(state) {
        var cards = [];
        var count = Math.min(Math.max(Number(state.drawnCount) || 0, 0), 52);
        for (var i = 0; i < count; i++) {
            var id = state.drawn && state.drawn[i];
            if (cardInfo(id)) cards.push(id);
        }
        return cards;
    }
    function render(state) {
        var cards = drawnCards(state);
        var count = Math.min(Math.max(Number(state.drawnCount) || 0, 0), 52);
        var pattern = patternNames[state.patternId] ? state.patternId : "standard";
        var signature = [state.round, state.phase, pattern, count, cards.join(",")].join("|");
        showDisplay();
        setText("connection-label", "LIVE FROM THE CALLER'S DEVICE");
        if (signature === lastSignature) return;
        lastSignature = signature;
        setText("pattern-name", patternNames[pattern]);
        renderPattern(pattern);
        setText("room-label", "ROOM " + roomCode);
        setText("draw-count", count + " / 52");
        setText("round-label", Number(state.round) > 0 ? "ROUND " + state.round : "TABLE SETUP");
        var current = cards.length ? cards[cards.length - 1] : null;
        var currentContainer = byId("current-card");
        clearChildren(currentContainer);
        currentContainer.appendChild(makeCard(current, true));
        setText("current-name", current ? cardInfo(current).name : "Waiting for the first draw");
        var previous = byId("previous-cards");
        clearChildren(previous);
        for (var i = 1; i <= 4; i++) {
            if (cards.length > i) previous.appendChild(makeCard(cards[cards.length - 1 - i], false));
            else {
                var empty = document.createElement("div");
                empty.className = "empty-card";
                empty.setAttribute("aria-label", "No earlier card yet");
                empty.textContent = "✦";
                previous.appendChild(empty);
            }
        }
        var phase = byId("phase-label");
        phase.hidden = state.phase !== "paused" && state.phase !== "finished";
        phase.textContent = state.phase === "paused" ? "PAUSED FOR VERIFICATION" : "ROUND COMPLETE";
    }
    function poll() {
        if (!roomCode) return;
        var requestedCode = roomCode;
        ensureSignIn(function (error) {
            if (requestedCode !== roomCode) return;
            if (error) {
                showJoin(error);
                schedulePoll(5000);
                return;
            }
            var databaseUrl = config.databaseURL.replace(/\/$/, "");
            var url = databaseUrl + "/rooms/" + requestedCode + "/state.json?auth=" + encodeURIComponent(token) + "&_=" + Date.now();
            request("GET", url, null, null, function (status, state) {
                if (requestedCode !== roomCode) return;
                if (status === 200 && state) {
                    render(state);
                    schedulePoll(1500);
                } else if (status === 200) {
                    showJoin("That table was not found. Check the code on the caller's phone.");
                    schedulePoll(3000);
                } else {
                    if (status === 401 || status === 403) tokenExpiresAt = 0;
                    if (!byId("display-screen").hidden) {
                        setText("connection-label", "RECONNECTING · SHOWING LAST KNOWN CARD");
                    } else showJoin("Connection failed. Retrying automatically…");
                    schedulePoll(4000);
                }
            });
        });
    }
    function join(code) {
        if (!config) {
            showJoin("Connecting to the game service. Please try again in a moment.");
            return;
        }
        code = String(code || "").replace(/^\s+|\s+$/g, "").toUpperCase();
        byId("room-code").value = code;
        if (!codePattern.test(code)) {
            showJoin("Enter the eight letters and numbers shown on the caller's phone.");
            return;
        }
        roomCode = code;
        lastSignature = "";
        showJoin("Joining room " + roomCode + "…");
        try { history.replaceState(null, "", "tv.html?room=" + encodeURIComponent(roomCode)); } catch (error) { /* The room still works without URL history. */ }
        schedulePoll(0);
    }
    function start() {
        byId("join-form").onsubmit = function (event) {
            if (event.preventDefault) event.preventDefault();
            join(byId("room-code").value);
            return false;
        };
        byId("change-room").onclick = function () {
            roomCode = "";
            lastSignature = "";
            clearTimeout(pollTimer);
            byId("room-code").value = "";
            try { history.replaceState(null, "", "tv.html"); } catch (error) { /* The room can still be changed. */ }
            showJoin("Enter another room code.");
            byId("room-code").focus();
        };
        byId("fullscreen-button").onclick = function () {
            var root = document.documentElement;
            var open = root.requestFullscreen || root.webkitRequestFullscreen;
            if (open) open.call(root);
        };
        request("GET", "firebase-config.json", null, null, function (status, data) {
            if (status !== 200 || !data || !data.apiKey || !data.databaseURL) {
                showJoin("Firebase configuration could not be loaded. Reload the TV page.");
                return;
            }
            config = data;
            var match = /[?&]room=([^&]*)/.exec(location.search);
            if (match) {
                try { join(decodeURIComponent(match[1])); }
                catch (error) { showJoin("The room link is invalid. Enter the code manually."); }
            } else showJoin("Enter the room code to show the cards.");
        });
    }
    start();
}());
