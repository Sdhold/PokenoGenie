using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;

namespace PokenoGenie.Core;

public sealed class BoardSet
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string OwnerUid { get; set; } = "";
    public int Version { get; set; }
    public bool Deleted { get; set; }
    public Dictionary<string, BoardSummary> Boards { get; set; } = [];
}

public sealed class BoardSummary
{
    public string Label { get; set; } = "";
    public string RevisionId { get; set; } = "";
    public string LayoutHash { get; set; } = "";
    public bool Archived { get; set; }
}

public sealed class BoardRevision
{
    public string SetId { get; set; } = "";
    public string BoardId { get; set; } = "";
    public string RevisionId { get; set; } = "";
    public string Label { get; set; } = "";
    public List<string> Cards { get; set; } = [];
    public string LayoutHash { get; set; } = "";
    public string CreatedBy { get; set; } = "";
    public long CreatedAt { get; set; }
}

public sealed class BoardDraft
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string SetId { get; set; } = "";
    public string BoardId { get; set; } = Guid.NewGuid().ToString("N");
    public string Label { get; set; } = "Board 01";
    public string BaseRevisionId { get; set; } = "";
    public List<string> Cards { get; set; } = Enumerable.Repeat("", 25).ToList();
    public int CurrentCell { get; set; }
    public string PendingRank { get; set; } = "";
    public long UpdatedAt { get; set; }
    public bool PendingSync { get; set; }

    public BoardDraft Copy() => new()
    {
        Id = Id, SetId = SetId, BoardId = BoardId, Label = Label,
        BaseRevisionId = BaseRevisionId, Cards = [.. Cards], CurrentCell = CurrentCell,
        PendingRank = PendingRank, UpdatedAt = UpdatedAt, PendingSync = PendingSync
    };
}

public sealed class LibraryEditor
{
    public string Uid { get; set; } = "";
    public bool CanEdit { get; set; }
}

public sealed class RoundBoards
{
    public int Round { get; set; }
    public string SetId { get; set; } = "";
    public string SetName { get; set; } = "";
    public Dictionary<string, string> Revisions { get; set; } = [];
    public Dictionary<string, string> Labels { get; set; } = [];
}

// Store the checked layout/reference, not a client assertion that someone won.
// Both display implementations calculate the outcome from the room's called cards.
public sealed class BoardCheck
{
    public string Id { get; set; } = "";
    public int Round { get; set; }
    public string PatternId { get; set; } = "";
    public int DrawnCount { get; set; }
    public string SetId { get; set; } = "";
    public string SetName { get; set; } = "";
    public string BoardId { get; set; } = "";
    public string RevisionId { get; set; } = "";
    public string Label { get; set; } = "";
    public List<string> Cards { get; set; } = [];
    public long CheckedAt { get; set; }

    public bool Matches(RoomState? room) => room is not null && !room.GuideOpen &&
        room.Phase is GamePhase.Paused or GamePhase.Finished && Round == room.Round &&
        DrawnCount == room.DrawnCount && PatternId == room.PatternId &&
        room.DrawnCount is >= 0 and <= 52 && room.Drawn.Count == room.DrawnCount &&
        room.Drawn.All(card => PlayingCard.FromId(card) is not null) && room.Drawn.Distinct().Count() == room.DrawnCount &&
        BoardLayouts.Validate(Cards).Count == 0;
}

public sealed record BoardVerdict(bool IsWinner, int[] PatternCells, int[] CalledCells, string[] MissingCards);

public static class BoardLayouts
{
    public static string Normalize(string value) => value.Trim().ToUpperInvariant()
        .Replace("♠", "S").Replace("♥", "H").Replace("♦", "D").Replace("♣", "C");

    public static List<string> Parse(string text)
    {
        var values = text.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries)
            .Select(value => Normalize(value.Trim(',', ';', '|'))).ToList();
        var errors = Validate(values);
        if (errors.Count != 0) throw new ArgumentException(string.Join(" ", errors));
        return values;
    }

    public static IReadOnlyList<string> Validate(IReadOnlyList<string>? cards)
    {
        var errors = new List<string>();
        if (cards is null || cards.Count != 25) return ["A board must have exactly 25 cards."];
        var seen = new Dictionary<string, int>(StringComparer.Ordinal);
        for (var index = 0; index < 25; index++)
        {
            if (PlayingCard.FromId(cards[index]) is null)
                errors.Add($"Row {index / 5 + 1}, column {index % 5 + 1} needs a valid card.");
            else if (!seen.TryAdd(cards[index], index))
                errors.Add($"{cards[index]} is repeated at row {index / 5 + 1}, column {index % 5 + 1}.");
        }
        return errors;
    }

    public static string Hash(IReadOnlyList<string> cards) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(string.Join(",", cards)))).ToLowerInvariant();

    public static List<string> Rotate(IReadOnlyList<string> cards) => Enumerable.Range(0, 25)
        .Select(index => cards[(4 - index % 5) * 5 + index / 5]).ToList();

    public static BoardVerdict Check(IReadOnlyList<string> cards, IReadOnlyCollection<string> called, string patternId)
    {
        var errors = Validate(cards);
        if (errors.Count > 0) throw new ArgumentException(string.Join(" ", errors));
        var pattern = PatternCatalog.Find(patternId) ?? throw new ArgumentException("Choose a valid Pokeno pattern.");
        var calledSet = called.ToHashSet(StringComparer.Ordinal);
        if (called.Any(card => PlayingCard.FromId(card) is null))
            throw new ArgumentException("The called-card list contains an invalid card.");
        var best = pattern.WinningMasks
            .Select(mask => new { Mask = mask, Missing = mask.Where(cell => !calledSet.Contains(cards[cell])).Select(cell => cards[cell]).ToArray() })
            .OrderBy(result => result.Missing.Length).First();
        return new(best.Missing.Length == 0, [.. best.Mask],
            Enumerable.Range(0, 25).Where(cell => calledSet.Contains(cards[cell])).ToArray(), best.Missing);
    }
}
