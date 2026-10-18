using System.Security.Cryptography;

namespace PokenoGenie.Core;

public static class DeckShuffler
{
    public static string[] Shuffle()
    {
        var cards = PlayingCard.All.Select(card => card.Id).ToArray();

        // Fisher-Yates chooses each remaining position with equal probability.
        for (var last = cards.Length - 1; last > 0; last--)
        {
            var chosen = RandomNumberGenerator.GetInt32(last + 1);
            (cards[last], cards[chosen]) = (cards[chosen], cards[last]);
        }

        return cards;
    }
}
