using System.Security.Cryptography;

namespace PokenoGenie.Core;

public static class RoomCode
{
    public const int Length = 8;
    private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    public static string Generate() => new(Enumerable.Range(0, Length)
        .Select(_ => Alphabet[RandomNumberGenerator.GetInt32(Alphabet.Length)])
        .ToArray());

    public static string Normalize(string? value) =>
        (value ?? string.Empty).Trim().ToUpperInvariant();

    public static bool IsValid(string? value) =>
        value is { Length: Length } && value.All(character => Alphabet.Contains(character));
}
