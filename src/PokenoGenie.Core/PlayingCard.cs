namespace PokenoGenie.Core;

public sealed record PlayingCard(string Id, string Rank, string RankName, char Suit, string SuitName)
{
    public bool IsRed => Suit is '♥' or '♦';
    public string AccessibleName => $"{RankName} of {SuitName}";

    public static IReadOnlyList<PlayingCard> All { get; } = BuildDeck();

    private static readonly IReadOnlyDictionary<string, PlayingCard> ById =
        All.ToDictionary(card => card.Id, StringComparer.Ordinal);

    public static PlayingCard? FromId(string? id) =>
        id is not null && ById.TryGetValue(id, out var card) ? card : null;

    private static IReadOnlyList<PlayingCard> BuildDeck()
    {
        (string Code, char Symbol, string Name)[] suits =
        [
            ("S", '♠', "Spades"),
            ("H", '♥', "Hearts"),
            ("D", '♦', "Diamonds"),
            ("C", '♣', "Clubs")
        ];

        (string Code, string Name)[] ranks =
        [
            ("A", "Ace"), ("2", "Two"), ("3", "Three"), ("4", "Four"),
            ("5", "Five"), ("6", "Six"), ("7", "Seven"), ("8", "Eight"),
            ("9", "Nine"), ("10", "Ten"), ("J", "Jack"),
            ("Q", "Queen"), ("K", "King")
        ];

        return (from suit in suits
                from rank in ranks
                select new PlayingCard(rank.Code + suit.Code, rank.Code, rank.Name,
                    suit.Symbol, suit.Name)).ToArray();
    }
}
