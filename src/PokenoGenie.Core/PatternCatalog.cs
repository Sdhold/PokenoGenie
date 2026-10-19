namespace PokenoGenie.Core;

public sealed record PatternDefinition(
    string Id,
    string Name,
    string Description,
    IReadOnlyList<int[]> WinningMasks)
{
    public int[] PreviewMask => WinningMasks[0];
    public bool IsInPreview(int cell) => PreviewMask.Contains(cell);
}

public static class PatternCatalog
{
    private static readonly int[][] Rows = Enumerable.Range(0, 5)
        .Select(row => Enumerable.Range(0, 5).Select(column => row * 5 + column).ToArray())
        .ToArray();

    private static readonly int[][] Columns = Enumerable.Range(0, 5)
        .Select(column => Enumerable.Range(0, 5).Select(row => row * 5 + column).ToArray())
        .ToArray();

    private static readonly int[][] Diagonals =
    [
        Enumerable.Range(0, 5).Select(index => index * 6).ToArray(),
        Enumerable.Range(0, 5).Select(index => 4 + index * 4).ToArray()
    ];

    public static IReadOnlyList<PatternDefinition> All { get; } =
    [
        new("standard", "Standard Pokeno", "Any row, column, or diagonal.",
            [.. Rows, .. Columns, .. Diagonals]),
        new("horizontal", "Horizontal line", "Any complete row.", Rows),
        new("vertical", "Vertical line", "Any complete column.", Columns),
        new("diagonal", "Diagonal line", "Either complete diagonal.", Diagonals),
        new("h", "H", "Both outside columns and the middle row.",
            [Mask((row, column) => column == 0 || column == 4 || row == 2)]),
        new("c", "C", "Top and bottom rows with the left column; opens right.",
            [Mask((row, column) => row == 0 || row == 4 || column == 0)]),
        new("i", "Capital I", "Top and bottom rows with the middle column.",
            [Mask((row, column) => row == 0 || row == 4 || column == 2)]),
        new("s", "S", "Top, middle, and bottom rows joined at the upper left and lower right.",
            [Mask((row, column) => row == 0 || row == 2 || row == 4 || (row == 1 && column == 0) || (row == 3 && column == 4))]),
        new("t", "T", "Top row and middle column.",
            [Mask((row, column) => row == 0 || column == 2)]),
        new("l", "L", "Left column and bottom row.",
            [Mask((row, column) => column == 0 || row == 4)]),
        new("u", "U", "Both outside columns and the bottom row.",
            [Mask((row, column) => column == 0 || column == 4 || row == 4)]),
        new("z", "Z", "Top and bottom rows joined by the diagonal from top right to bottom left.",
            [Mask((row, column) => row == 0 || row == 4 || row + column == 4)]),
        new("x", "X", "Both diagonals.",
            [Mask((row, column) => row == column || row + column == 4)]),
        new("plus", "Plus", "Middle row and middle column.",
            [Mask((row, column) => row == 2 || column == 2)]),
        new("corners", "Four corners", "The four corner spaces.",
            [Mask((row, column) => (row == 0 || row == 4) && (column == 0 || column == 4))]),
        new("diamond", "Diamond", "A diamond outline through the middle of each edge.",
            [Mask((row, column) => Math.Abs(row - 2) + Math.Abs(column - 2) == 2)]),
        new("inner-square", "Inner square", "The outline of the middle 3×3 square; leave the center open.",
            [Mask((row, column) => row >= 1 && row <= 3 && column >= 1 && column <= 3 && (row == 1 || row == 3 || column == 1 || column == 3))]),
        new("checkerboard", "Checkerboard", "Alternating spaces, including all four corners and the center.",
            [Mask((row, column) => (row + column) % 2 == 0)]),
        new("perimeter", "Perimeter", "Every space around the outside edge.",
            [Mask((row, column) => row == 0 || row == 4 || column == 0 || column == 4)]),
        new("blackout", "Full board", "All 25 spaces.",
            [Enumerable.Range(0, 25).ToArray()])
    ];

    public static PatternDefinition? Find(string? id) =>
        All.FirstOrDefault(pattern => pattern.Id == id);

    private static int[] Mask(Func<int, int, bool> predicate) =>
        (from row in Enumerable.Range(0, 5)
         from column in Enumerable.Range(0, 5)
         where predicate(row, column)
         select row * 5 + column).ToArray();
}
