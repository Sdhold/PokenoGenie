(function (root) {
    "use strict";
    function validCard(value) { return typeof value === "string" && /^(A|[2-9]|10|J|Q|K)[SHDC]$/.test(value); }
    function validBoard(cards) {
        if (!cards || cards.length !== 25) return false;
        var seen = {};
        for (var i = 0; i < 25; i++) {
            if (!validCard(cards[i]) || seen[cards[i]]) return false;
            seen[cards[i]] = true;
        }
        return true;
    }
    function masks(pattern) {
        var rows = [], columns = [], diagonals = [[], []], fixed = [];
        for (var row = 0; row < 5; row++) {
            rows[row] = []; columns[row] = [];
            for (var column = 0; column < 5; column++) {
                rows[row].push(row * 5 + column); columns[row].push(column * 5 + row);
                var filled = false;
                if (pattern === "h") filled = column === 0 || column === 4 || row === 2;
                else if (pattern === "c") filled = row === 0 || row === 4 || column === 0;
                else if (pattern === "i") filled = row === 0 || row === 4 || column === 2;
                else if (pattern === "s") filled = row === 0 || row === 2 || row === 4 || (row === 1 && column === 0) || (row === 3 && column === 4);
                else if (pattern === "t") filled = row === 0 || column === 2;
                else if (pattern === "l") filled = column === 0 || row === 4;
                else if (pattern === "u") filled = column === 0 || column === 4 || row === 4;
                else if (pattern === "z") filled = row === 0 || row === 4 || row + column === 4;
                else if (pattern === "x") filled = row === column || row + column === 4;
                else if (pattern === "plus") filled = row === 2 || column === 2;
                else if (pattern === "corners") filled = (row === 0 || row === 4) && (column === 0 || column === 4);
                else if (pattern === "diamond") filled = Math.abs(row - 2) + Math.abs(column - 2) === 2;
                else if (pattern === "inner-square") filled = row >= 1 && row <= 3 && column >= 1 && column <= 3 && (row === 1 || row === 3 || column === 1 || column === 3);
                else if (pattern === "checkerboard") filled = (row + column) % 2 === 0;
                else if (pattern === "perimeter") filled = row === 0 || row === 4 || column === 0 || column === 4;
                else if (pattern === "blackout") filled = true;
                if (filled) fixed.push(row * 5 + column);
            }
            diagonals[0].push(row * 6); diagonals[1].push(4 + row * 4);
        }
        if (pattern === "standard") return rows.concat(columns, diagonals);
        if (pattern === "horizontal") return rows;
        if (pattern === "vertical") return columns;
        if (pattern === "diagonal") return diagonals;
        return fixed.length ? [fixed] : [];
    }
    function verify(cards, drawn, pattern) {
        if (!validBoard(cards)) return null;
        var choices = masks(pattern), called = {}, calledCells = [], best = null;
        if (!choices.length || !drawn) return null;
        for (var i = 0; i < drawn.length; i++) {
            if (!validCard(drawn[i])) return null;
            called[drawn[i]] = true;
        }
        for (var cell = 0; cell < 25; cell++) if (called[cards[cell]]) calledCells.push(cell);
        for (var choice = 0; choice < choices.length; choice++) {
            var missing = [];
            for (var member = 0; member < choices[choice].length; member++) {
                var value = cards[choices[choice][member]];
                if (!called[value]) missing.push(value);
            }
            if (!best || missing.length < best.missingCards.length) best = {
                isWinner: missing.length === 0, patternCells: choices[choice], calledCells: calledCells, missingCards: missing
            };
        }
        return best;
    }
    function matches(check, state) {
        if (!state || typeof state.drawnCount !== "number" || state.drawnCount < 0 || state.drawnCount > 52) return false;
        var drawn = state.drawn || [], seen = {};
        if (Object.keys(drawn).length !== state.drawnCount) return false;
        for (var i = 0; i < state.drawnCount; i++) {
            if (!validCard(drawn[i]) || seen[drawn[i]]) return false;
            seen[drawn[i]] = true;
        }
        return !!check && !!state && state.guideOpen !== true && (state.phase === "paused" || state.phase === "finished") &&
            check.round === state.round && check.drawnCount === state.drawnCount && check.patternId === state.patternId && validBoard(check.cards);
    }
    root.pokenoBoards = { verify: verify, matches: matches, masks: masks };
}(window));
