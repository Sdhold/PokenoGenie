namespace PokenoGenie.Core;

public sealed record DeckTheme(string Id, string Name, string Description, string PreviewCardId = "JH")
{
    public string PreviewPath => DeckThemeCatalog.CardPath(Id, PreviewCardId);
}

public static class DeckThemeCatalog
{
    public const string DefaultId = "illustrated";

    public static IReadOnlyList<DeckTheme> All { get; } =
    [
        new(DefaultId, "Illustrated", "The original cream and green deck"),
        new("midnight", "Midnight", "Dark navy with warm gold details"),
        new("sunburst", "Sunburst", "Bright coral and blue cards"),
        new("mopar", "MOPAR Muscle", "Muscle cars, bold paint, and racing details", "AH"),
        new("dart1969", "1969 Dart", "A blue 1969 Dodge Dart with chrome and a white rear stripe", "AH")
    ];

    public static DeckTheme FindOrDefault(string? id) =>
        All.FirstOrDefault(theme => theme.Id == id) ?? All[0];

    public static string CardPath(string? themeId, string cardId)
    {
        var theme = FindOrDefault(themeId);
        return theme.Id == DefaultId ? $"cards/{cardId}.svg" : $"cards/{theme.Id}/{cardId}.svg";
    }

    public static string BackPath(string? themeId)
    {
        var theme = FindOrDefault(themeId);
        return $"cards/{theme.Id}/back.svg";
    }
}
