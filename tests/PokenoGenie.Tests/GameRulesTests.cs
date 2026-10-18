using PokenoGenie.Core;

namespace PokenoGenie.Tests;

public class GameRulesTests
{
    [Fact]
    public void EveryShuffleContainsEachCardExactlyOnce()
    {
        var expected = PlayingCard.All.Select(card => card.Id).Order().ToArray();

        for (var attempt = 0; attempt < 100; attempt++)
        {
            var shuffled = DeckShuffler.Shuffle();
            Assert.Equal(52, shuffled.Length);
            Assert.Equal(expected, shuffled.Order().ToArray());
        }
    }

    [Fact]
    public void PatternMasksMatchTheFiveByFiveBoard()
    {
        Assert.Equal(12, PatternCatalog.Find("standard")!.WinningMasks.Count);
        Assert.Equal(5, PatternCatalog.Find("horizontal")!.WinningMasks.Count);
        Assert.Equal(5, PatternCatalog.Find("vertical")!.WinningMasks.Count);
        Assert.Equal(2, PatternCatalog.Find("diagonal")!.WinningMasks.Count);
        Assert.Equal(Enumerable.Range(0, 25).Where(cell => cell / 5 is 0 or 4 || cell % 5 == 0),
            PatternCatalog.Find("c")!.PreviewMask);
        Assert.Equal(16, PatternCatalog.Find("perimeter")!.PreviewMask.Length);
        Assert.Equal(25, PatternCatalog.Find("blackout")!.PreviewMask.Length);
        Assert.Equal(new[] { 0, 4, 20, 24 }, PatternCatalog.Find("corners")!.PreviewMask);

        foreach (var pattern in PatternCatalog.All)
        {
            Assert.NotEmpty(pattern.WinningMasks);
            foreach (var mask in pattern.WinningMasks)
            {
                Assert.Equal(mask.Length, mask.Distinct().Count());
                Assert.All(mask, cell => Assert.InRange(cell, 0, 24));
            }
        }
    }

    [Fact]
    public void CurrentAndPreviousCardsKeepDrawOrder()
    {
        var state = new RoomState { Drawn = ["AS", "2H", "QC", "10D", "KS", "3H"] };

        Assert.Equal("3H", state.CurrentCard!.Id);
        Assert.Equal(new[] { "KS", "10D", "QC", "2H" },
            state.PreviousFour.Select(card => card.Id));
    }

    [Fact]
    public void RoomCodesHaveEightUnambiguousCharacters()
    {
        for (var attempt = 0; attempt < 100; attempt++)
        {
            var code = RoomCode.Generate();
            Assert.True(RoomCode.IsValid(code));
            Assert.DoesNotContain(code, character => "IO01".Contains(character));
        }

        Assert.Equal("ABCDEFGH", RoomCode.Normalize(" abcdefgh "));
        Assert.False(RoomCode.IsValid("ABCD"));
    }
}
