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
        new("mopar", "MOPAR Muscle", "Charger, Challenger, ’Cuda, and Superbird", "AH"),
        new("dart1969", "1969 Dart", "A blue 1969 Dodge Dart with chrome and a white rear stripe", "AH"),
        new("harrypotter", "Harry Potter", "Hogwarts characters, wand magic, and the Golden Snitch", "JH"),
        new("starwars", "Star Wars", "Characters, lightsabers, droids, and the Death Star", "KS"),
        new("lordoftherings", "Lord of the Rings", "Aragorn, Arwen, Frodo, and the One Ring", "KS"),
        new("cats", "Royal Cats", "Binx, Autumn, Chip, and Anya, with playful cat scenes", "KS")
    ];

    public static DeckTheme FindOrDefault(string? id) =>
        All.FirstOrDefault(theme => theme.Id == id) ?? All[0];

    public static string CardPath(string? themeId, string cardId)
    {
        var theme = FindOrDefault(themeId);
        var path = theme.Id == DefaultId ? $"cards/{cardId}.svg" : $"cards/{theme.Id}/{cardId}.svg";
        return path + ArtworkVersion(theme.Id);
    }

    public static string BackPath(string? themeId)
    {
        var theme = FindOrDefault(themeId);
        return $"cards/{theme.Id}/back.svg" + ArtworkVersion(theme.Id);
    }

    private static string ArtworkVersion(string themeId) => themeId is "mopar" or "cats" ? "?v=2" : "";
}
