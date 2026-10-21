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
        new("cats", "Royal Cats", "Binx, Autumn, Chip, and Anya, with playful cat scenes", "KS"),
        new("route66", "Route 66", "Classic cruisers, hot rods, neon diners, and the open highway", "KS"),
        new("dinosaurs", "Dinosaurs", "T. rex, Triceratops, Velociraptor, and a prehistoric valley", "KS"),
        new("pokemon", "Pokémon", "Pikachu, Ninetales, Charizard, and a Poké Ball Ace", "JS"),
        new("halloween", "Halloween", "Friendly frights, a moonlight witch, pumpkins, and a haunted house", "QS"),
        new("christmas", "Christmas", "Santa, Mrs. Claus, an elf, and cozy winter scenes", "KS"),
        new("friendsgiving", "FriendsGiving", "The six Friends, Thanksgiving treats, and an orange couch", "QH"),
        new("mcpherson", "McPherson Magical Forest", "Diamond, Pitter, Clementine, and Quinn in an enchanted woodland", "AH"),
        new("pawffice", "The Pawffice", "Ellie, Parker, Sadie, and Pugsy at the Scranton paper office", "QH")
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
