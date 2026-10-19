using System.Text.Json.Serialization;

namespace PokenoGenie.Core;

public static class GamePhase
{
    public const string Lobby = "lobby";
    public const string Calling = "calling";
    public const string Paused = "paused";
    public const string Finished = "finished";
}

public sealed class RoomState
{
    [JsonPropertyName("ownerUid")]
    public string OwnerUid { get; set; } = string.Empty;

    [JsonPropertyName("round")]
    public int Round { get; set; }

    [JsonPropertyName("patternId")]
    public string PatternId { get; set; } = string.Empty;

    [JsonPropertyName("phase")]
    public string Phase { get; set; } = GamePhase.Lobby;

    [JsonPropertyName("guideOpen")]
    public bool GuideOpen { get; set; }

    [JsonPropertyName("drawn")]
    public List<string> Drawn { get; set; } = [];

    [JsonPropertyName("drawnCount")]
    public int DrawnCount { get; set; }

    [JsonPropertyName("lastDrawAt")]
    public long LastDrawAt { get; set; }

    [JsonPropertyName("createdAt")]
    public long CreatedAt { get; set; }

    public PlayingCard? CurrentCard => PlayingCard.FromId(Drawn.LastOrDefault());

    public IReadOnlyList<PlayingCard> PreviousFour => Drawn
        .Take(Math.Max(0, Drawn.Count - 1))
        .Reverse()
        .Take(4)
        .Select(PlayingCard.FromId)
        .OfType<PlayingCard>()
        .ToArray();
}

public sealed class PrivateDeck
{
    [JsonPropertyName("ownerUid")]
    public string OwnerUid { get; set; } = string.Empty;

    [JsonPropertyName("round")]
    public int Round { get; set; }

    [JsonPropertyName("cards")]
    public List<string> Cards { get; set; } = [];
}
