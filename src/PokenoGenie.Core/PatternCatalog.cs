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
        new("standard", "Standard bingo", "Any row, column, or diagonal.",
            [.. Rows, .. Columns, .. Diagonals]),
        new("horizontal", "Horizontal line", "Any complete row.", Rows),
        new("vertical", "Vertical line", "Any complete column.", Columns),
        new("diagonal", "Diagonal line", "Either complete diagonal.", Diagonals),
        new("h", "H", "Both outside columns and the middle row.",
            [Mask((row, column) => column == 0 || column == 4 || row == 2)]),
        new("c", "C", "Top and bottom rows with the left column; opens right.",
            [Mask((row, column) => row == 0 || row == 4 || column == 0)]),
        new("x", "X", "Both diagonals.",
            [Mask((row, column) => row == column || row + column == 4)]),
        new("plus", "Plus", "Middle row and middle column.",
            [Mask((row, column) => row == 2 || column == 2)]),
        new("corners", "Four corners", "The four corner spaces.",
            [Mask((row, column) => (row == 0 || row == 4) && (column == 0 || column == 4))]),
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
