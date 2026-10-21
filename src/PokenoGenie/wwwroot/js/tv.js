(function () {
    "use strict";

    var config;
    var token = "";
    var refreshToken = "";
    var tokenExpiresAt = 0;
    var roomCode = "";
    var pollTimer;
    var lastSignature = "";
    var lastTheme = "illustrated";
    var lastState = null;
    var themeInFlight = false;
    var checkInFlight = false;
    var lastCheck = null;
    var codePattern = /^[A-HJ-NP-Z2-9]{8}$/;
    var patternNames = {
        standard: "Standard Pokeno", horizontal: "Horizontal line", vertical: "Vertical line",
        diagonal: "Diagonal line", h: "H", c: "C", i: "Capital I", s: "S", t: "T", l: "L", u: "U", z: "Z", x: "X", plus: "Plus",
        corners: "Four corners", diamond: "Diamond", "inner-square": "Inner square", checkerboard: "Checkerboard",
        perimeter: "Perimeter", blackout: "Full board"
    };
    var suitSymbols = { S: "♠", H: "♥", D: "♦", C: "♣" };
    var suitNames = { S: "Spades", H: "Hearts", D: "Diamonds", C: "Clubs" };
    var rankNames = {
        A: "Ace", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
        "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", "10": "Ten",
        J: "Jack", Q: "Queen", K: "King"
    };
    var themeIds = { illustrated: true, midnight: true, sunburst: true, mopar: true, dart1969: true, harrypotter: true, starwars: true, lordoftherings: true, cats: true, route66: true, dinosaurs: true, pokemon: true, halloween: true, christmas: true, friendsgiving: true, mcpherson: true, pawffice: true };

    function cardAsset(themeId, id) {
        var path = themeId === "illustrated" ? "cards/" + id + ".svg" : "cards/" + themeId + "/" + id + ".svg";
        return path + (themeId === "mopar" || themeId === "cats" ? "?v=2" : "");
    }

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
        if (localEmulators()) url = "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + encodeURIComponent(config.apiKey);
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
        if (localEmulators()) url = "http://127.0.0.1:9099/securetoken.googleapis.com/v1/token?key=" + encodeURIComponent(config.apiKey);
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
    function localEmulators() { return config.useEmulators === true && (location.hostname === "127.0.0.1" || location.hostname === "localhost"); }
    function databaseRequest(path) {
        var base = localEmulators() ? "http://127.0.0.1:9000" : config.databaseURL.replace(/\/$/, "");
        return base + path + "?" + (localEmulators() ? "ns=" + encodeURIComponent(config.projectId) + "&" : "") + "auth=" + encodeURIComponent(token) + "&_=" + Date.now();
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
    function makeCard(id, large, themeId) {
        var element = document.createElement("div");
        var info = cardInfo(id);
        element.className = "tv-card" + (large ? " large" : "") + (info && info.red ? " red" : "");
        element.setAttribute("role", "img");
        if (!info) {
            element.className += " back";
            element.setAttribute("aria-label", "Face-down card");
            if (themeId === "illustrated") {
                var logo = document.createElement("span");
                logo.textContent = "PG";
                element.appendChild(logo);
            } else {
                element.className += " art-back";
                var back = document.createElement("img");
                back.className = "card-art";
                back.src = "cards/" + themeId + "/back.svg" + (themeId === "mopar" || themeId === "cats" ? "?v=2" : "");
                back.alt = "";
                back.draggable = false;
                element.appendChild(back);
            }
        } else {
            element.setAttribute("aria-label", info.name);
            var art = document.createElement("img");
            art.className = "card-art";
            art.src = cardAsset(themeId, id);
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
        if (pattern === "i") return row === 0 || row === 4 || column === 2;
        if (pattern === "s") return row === 0 || row === 2 || row === 4 || (row === 1 && column === 0) || (row === 3 && column === 4);
        if (pattern === "t") return row === 0 || column === 2;
        if (pattern === "l") return column === 0 || row === 4;
        if (pattern === "u") return column === 0 || column === 4 || row === 4;
        if (pattern === "z") return row === 0 || row === 4 || row + column === 4;
        if (pattern === "x") return row === column || row + column === 4;
        if (pattern === "plus") return row === 2 || column === 2;
        if (pattern === "corners") return (row === 0 || row === 4) && (column === 0 || column === 4);
        if (pattern === "diamond") return Math.abs(row - 2) + Math.abs(column - 2) === 2;
        if (pattern === "inner-square") return row >= 1 && row <= 3 && column >= 1 && column <= 3 && (row === 1 || row === 3 || column === 1 || column === 3);
        if (pattern === "checkerboard") return (row + column) % 2 === 0;
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
    function renderBoardCheck(state, themeId, check) {
        var verdict = window.pokenoBoards.verify(check.cards, drawnCards(state), state.patternId);
        if (!verdict) return;
        setText("board-result-eyebrow", verdict.isWinner ? "WINNER · POKENO!" : "BOARD CHECK · NOT A WIN YET");
        setText("board-result-title", verdict.isWinner ? check.label + " wins!" : check.label + ": " + verdict.missingCards.length + " still needed");
        setText("board-result-description", verdict.isWinner ? "Every card in the winning shape has been called." : "Missing from the closest allowed winning shape:");
        setText("board-result-set", check.setName + " · " + patternNames[state.patternId] + " · Round " + state.round);
        var graphic = byId("winner-graphic");
        graphic.hidden = !verdict.isWinner;
        if (verdict.isWinner) graphic.src = "winners/" + themeId + ".svg?v=1";
        var missing = byId("board-result-missing"); clearChildren(missing);
        for (var m = 0; m < verdict.missingCards.length; m++) {
            var needed = cardInfo(verdict.missingCards[m]), chip = document.createElement("span");
            chip.textContent = needed.rank + needed.suit;
            if (needed.red) chip.className = "red-suit";
            missing.appendChild(chip);
        }
        var grid = byId("board-result-cards"); clearChildren(grid);
        for (var i = 0; i < 25; i++) {
            var info = cardInfo(check.cards[i]), tile = document.createElement("div");
            var called = verdict.calledCells.indexOf(i) !== -1;
            tile.className = "board-card-cell" + (verdict.patternCells.indexOf(i) !== -1 ? " pattern-cell" : "") + (called ? " called-cell" : "");
            tile.setAttribute("aria-label", info.name + (called ? ", called" : ", not called"));
            tile.appendChild(makeCard(check.cards[i], false, themeId));
            var value = document.createElement("strong"); value.textContent = info.rank + info.suit;
            if (info.red) value.className = "red-suit";
            tile.appendChild(value);
            if (called) { var marker = document.createElement("span"); marker.className = "board-called-marker"; marker.textContent = "✓"; tile.appendChild(marker); }
            grid.appendChild(tile);
        }
    }
    function render(state, themeId) {
        var cards = drawnCards(state);
        var count = Math.min(Math.max(Number(state.drawnCount) || 0, 0), 52);
        var pattern = patternNames[state.patternId] ? state.patternId : "standard";
        var showingGuide = state.guideOpen === true;
        var checkingBoard = window.pokenoBoards.matches(lastCheck, state);
        var signature = [state.round, state.phase, showingGuide, pattern, count, cards.join(","), themeId, checkingBoard ? lastCheck.id : ""].join("|");
        showDisplay();
        setText("connection-label", "LIVE FROM THE CALLER'S DEVICE");
        if (signature === lastSignature) return;
        lastSignature = signature;
        byId("display-screen").setAttribute("data-deck-theme", themeId);
        var verifying = (state.phase === "paused" || state.phase === "finished") && !showingGuide;
        byId("display-screen").className = "display-screen" + (verifying ? " is-verifying" : "");
        byId("calling-display").hidden = verifying || showingGuide || checkingBoard;
        byId("verification-panel").hidden = !verifying || checkingBoard;
        byId("board-result-panel").hidden = !checkingBoard;
        byId("howto-panel").hidden = !showingGuide;
        setText("pattern-name", patternNames[pattern]);
        renderPattern(pattern);
        setText("room-label", "ROOM " + roomCode);
        setText("draw-count", count + " / 52");
        setText("round-label", Number(state.round) > 0 ? "ROUND " + state.round : "TABLE SETUP");
        var verification = byId("verification-cards");
        clearChildren(verification);
        if (showingGuide) return;
        if (checkingBoard) { renderBoardCheck(state, themeId, lastCheck); return; }
        if (verifying) {
            setText("verification-eyebrow", (state.phase === "finished" ? "ROUND COMPLETE" : "PAUSED") + " · ALL CALLED CARDS");
            setText("verification-title", state.phase === "finished" ? "The round is complete." : "Verify the win.");
            for (var calledIndex = 0; calledIndex < cards.length; calledIndex++) {
                var info = cardInfo(cards[calledIndex]);
                var latest = calledIndex === cards.length - 1;
                var item = document.createElement("li");
                item.className = "verification-item" + (info.red ? " red" : "") + (latest ? " latest" : "");
                item.setAttribute("aria-label", "Draw " + (calledIndex + 1) + ": " + info.name + (latest ? ", latest card" : ""));
                item.appendChild(makeCard(cards[calledIndex], false, themeId));
                var details = document.createElement("div");
                details.className = "verification-details";
                var order = document.createElement("small");
                order.className = "verification-order";
                order.textContent = "#" + (calledIndex + 1) + (latest ? " · LAST" : "");
                var label = document.createElement("strong");
                label.className = "verification-card-label";
                label.textContent = info.rank + info.suit;
                details.appendChild(order);
                details.appendChild(label);
                item.appendChild(details);
                verification.appendChild(item);
            }
            byId("verification-empty").hidden = cards.length !== 0;
            byId("verification-grid-wrap").hidden = cards.length === 0;
            window.pokenoVerificationLayout.fit();
            return;
        }
        var current = cards.length ? cards[cards.length - 1] : null;
        var currentContainer = byId("current-card");
        clearChildren(currentContainer);
        currentContainer.appendChild(makeCard(current, true, themeId));
        setText("current-name", current ? cardInfo(current).name : "Waiting for the first draw");
        var previous = byId("previous-cards");
        clearChildren(previous);
        for (var i = 1; i <= 4; i++) {
            if (cards.length > i) previous.appendChild(makeCard(cards[cards.length - 1 - i], false, themeId));
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
    function pollCheck(requestedCode, expected) {
        if (checkInFlight || (expected.phase !== "paused" && expected.phase !== "finished")) return;
        checkInFlight = true;
        var url = databaseRequest("/rooms/" + requestedCode + "/verification.json");
        request("GET", url, null, null, function (status, check) {
            if (requestedCode !== roomCode) return;
            checkInFlight = false;
            if (status !== 200 || !lastState || lastState.round !== expected.round || lastState.drawnCount !== expected.drawnCount || lastState.phase !== expected.phase) return;
            lastCheck = window.pokenoBoards.matches(check, lastState) ? check : null;
            render(lastState, lastTheme);
        });
    }
    function pollTheme(requestedCode) {
        if (themeInFlight) return;
        themeInFlight = true;
        var url = databaseRequest("/rooms/" + requestedCode + "/theme.json");
        request("GET", url, null, null, function (status, themeId) {
            if (requestedCode !== roomCode) return;
            themeInFlight = false;
            if (status === 200) {
                lastTheme = themeIds[themeId] ? themeId : "illustrated";
                if (lastState) render(lastState, lastTheme);
            }
        });
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
            var url = databaseRequest("/rooms/" + requestedCode + "/state.json");
            request("GET", url, null, null, function (status, state) {
                if (requestedCode !== roomCode) return;
                if (status === 200 && state) {
                    lastState = state;
                    if (state.phase !== "paused" && state.phase !== "finished") lastCheck = null;
                    render(state, lastTheme);
                    schedulePoll(1500);
                    pollTheme(requestedCode);
                    pollCheck(requestedCode, state);
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
        lastTheme = "illustrated";
        lastState = null;
        lastCheck = null;
        checkInFlight = false;
        themeInFlight = false;
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
            lastTheme = "illustrated";
            lastState = null;
            lastCheck = null;
            checkInFlight = false;
            themeInFlight = false;
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
