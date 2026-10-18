(function () {
    "use strict";

    // Size the same verification board in both TV clients. Older TV browsers
    // only need ordinary grid, custom properties and the window resize event.
    function calculate(width, height, count) {
        var gap = Math.max(6, Math.min(14, Math.round(width / 110)));
        var maxColumns = Math.max(1, Math.min(count, 13, Math.floor((width + gap) / (110 + gap))));
        var best = { columns: 1, rows: 1, size: 0 };
        for (var columns = 1; columns <= maxColumns; columns++) {
            var rows = Math.ceil(count / columns) || 1;
            var cellWidth = (width - gap * (columns - 1)) / columns;
            var cellHeight = (height - gap * (rows - 1)) / rows;
            var size = Math.min(cellWidth / 1.65, cellHeight, 210);
            if (size > best.size) best = { columns: columns, rows: rows, size: size };
        }
        var tileHeight = Math.max(64, Math.floor(best.size));
        return {
            columns: best.columns, rows: best.rows, gap: gap, tileHeight: tileHeight,
            faceHeight: Math.floor(tileHeight * 0.7),
            labelSize: Math.max(18, Math.min(64, Math.floor(tileHeight * 0.38)))
        };
    }

    function fit() {
        var grids = document.querySelectorAll(".verification-grid");
        for (var i = 0; i < grids.length; i++) {
            var grid = grids[i];
            var frame = grid.parentNode;
            if (!grid.children.length || !frame.clientWidth || !frame.clientHeight) continue;
            var layout = calculate(frame.clientWidth, frame.clientHeight, grid.children.length);
            grid.style.gridTemplateColumns = "repeat(" + layout.columns + ", minmax(0, 1fr))";
            grid.style.gridTemplateRows = "repeat(" + layout.rows + ", " + layout.tileHeight + "px)";
            grid.style.gap = layout.gap + "px";
            grid.style.setProperty("--verification-face-height", layout.faceHeight + "px");
            grid.style.setProperty("--verification-face-width", Math.floor(layout.faceHeight * 5 / 7) + "px");
            grid.style.setProperty("--verification-label-size", layout.labelSize + "px");
        }
    }

    window.pokenoVerificationLayout = { fit: fit, calculate: calculate };
    window.addEventListener("resize", fit);
}());
