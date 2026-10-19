using PokenoGenie.Core;

namespace PokenoGenie.Tests;

public class BoardLibraryTests
{
    private static readonly string[] Board = PlayingCard.All.Take(25).Select(card => card.Id).ToArray();

    [Fact]
    public void EveryAllowedMaskForEveryPatternWinsOnlyAfterAllItsCardsAreCalled()
    {
        foreach (var pattern in PatternCatalog.All)
        foreach (var mask in pattern.WinningMasks)
        {
            var called = mask.Select(cell => Board[cell]).ToArray();
            var verdict = BoardLayouts.Check(Board, called, pattern.Id);
            Assert.True(verdict.IsWinner, $"{pattern.Name}: {string.Join(',', mask)}");
            Assert.Empty(verdict.MissingCards);
            Assert.Equal(mask.Length, verdict.PatternCells.Length);
            var incomplete = BoardLayouts.Check(Board, called.Skip(1).ToArray(), pattern.Id);
            Assert.False(incomplete.IsWinner, pattern.Name);
            Assert.NotEmpty(incomplete.MissingCards);
        }
    }

    [Fact]
    public void StandardPokenoFindsTheLastRowColumnAndOtherDiagonal()
    {
        foreach (var mask in new[] { new[] { 20, 21, 22, 23, 24 }, new[] { 4, 9, 14, 19, 24 }, new[] { 4, 8, 12, 16, 20 } })
        {
            var result = BoardLayouts.Check(Board, mask.Select(index => Board[index]).ToArray(), "standard");
            Assert.True(result.IsWinner);
            Assert.Equal(mask, result.PatternCells);
        }
    }

    [Fact]
    public void LetterShapesDoNotAcquireUnspecifiedRotations()
    {
        var rotated = BoardLayouts.Rotate(Board);
        var c = PatternCatalog.Find("c")!;
        Assert.False(BoardLayouts.Check(rotated, c.PreviewMask.Select(index => Board[index]).ToArray(), "c").IsWinner);
    }

    [Fact]
    public void ClosestShapeReportsExactMissingCardsAndAllCalledCells()
    {
        var mask = PatternCatalog.Find("h")!.PreviewMask;
        var called = mask.Skip(2).Select(index => Board[index]).Append(Board[6]).ToArray();
        var result = BoardLayouts.Check(Board, called, "h");
        Assert.False(result.IsWinner);
        Assert.Equal(mask.Take(2).Select(index => Board[index]), result.MissingCards);
        Assert.Contains(6, result.CalledCells);
    }

    [Fact]
    public void ValidationRejectsMissingInvalidAndRepeatedCards()
    {
        Assert.NotEmpty(BoardLayouts.Validate(Board.Take(24).ToArray()));
        var invalid = Board.ToArray(); invalid[12] = "Joker";
        Assert.Contains(BoardLayouts.Validate(invalid), error => error.Contains("Row 3, column 3"));
        invalid[12] = invalid[0]; Assert.Contains(BoardLayouts.Validate(invalid), error => error.Contains("repeated"));
        Assert.Throws<ArgumentException>(() => BoardLayouts.Check(invalid, [], "standard"));
        Assert.Throws<ArgumentException>(() => BoardLayouts.Check(Board, [], "unknown"));
    }

    [Fact]
    public void PasteAcceptsCaseAndSuitSymbolsAndRotationPreservesIdentity()
    {
        var text = string.Join(" \n", Board.Select(card => card.ToLowerInvariant().Replace("s", "♠").Replace("h", "♥")));
        Assert.Equal(Board, BoardLayouts.Parse(text));
        var rotated = Board.ToList(); for (var turn = 0; turn < 4; turn++) rotated = BoardLayouts.Rotate(rotated);
        Assert.Equal(Board, rotated);
        Assert.Equal(BoardLayouts.Hash(Board), BoardLayouts.Hash(rotated));
        Assert.NotEqual(BoardLayouts.Hash(Board), BoardLayouts.Hash(BoardLayouts.Rotate(Board)));
    }

    [Fact]
    public void AResultOnlyMatchesTheSamePausedOrFinishedRoundPatternAndCount()
    {
        var check = new BoardCheck { Round = 2, DrawnCount = 10, PatternId = "standard", Cards = [.. Board] };
        var room = new RoomState { Round = 2, DrawnCount = 10, Drawn = Board.Take(10).ToList(), PatternId = "standard", Phase = GamePhase.Paused };
        Assert.True(check.Matches(room));
        room.Phase = GamePhase.Calling; Assert.False(check.Matches(room));
        room.Phase = GamePhase.Paused; room.GuideOpen = true; Assert.False(check.Matches(room));
        room.GuideOpen = false; room.Round++; Assert.False(check.Matches(room));
        room.Round--; room.DrawnCount++; Assert.False(check.Matches(room));
        room.DrawnCount--; room.PatternId = "h"; Assert.False(check.Matches(room));
        room.PatternId = "standard"; room.Phase = GamePhase.Finished; Assert.True(check.Matches(room));
        room.Drawn.Add(Board[10]); Assert.False(check.Matches(room));
    }
}
