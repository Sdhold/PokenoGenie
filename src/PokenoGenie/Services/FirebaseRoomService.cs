using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using PokenoGenie.Core;

namespace PokenoGenie.Services;

public sealed class FirebaseRoomService(
    HttpClient http,
    IJSRuntime js,
    NavigationManager navigation) : IAsyncDisposable
{
    private IJSObjectReference? _module;
    private DotNetObjectReference<FirebaseRoomService>? _callbackReference;

    public event Action<RoomState?>? RoomChanged;
    public event Action<string>? ThemeChanged;
    public event Action<bool>? ConnectionChanged;
    public event Action<string>? ErrorReceived;

    public string? UserId { get; private set; }
    public bool IsConnected { get; private set; }
    public long ServerOffsetMs { get; private set; }

    public async Task InitializeAsync()
    {
        if (_module is not null) return;

        FirebaseOptions? options;
        try
        {
            options = await http.GetFromJsonAsync<FirebaseOptions>("firebase-config.json");
        }
        catch (Exception error) when (error is HttpRequestException or JsonException)
        {
            throw new InvalidOperationException(
                "Firebase is not configured yet. Follow the setup steps in DEPLOYMENT.md.", error);
        }

        if (options is null || !options.IsComplete)
        {
            throw new InvalidOperationException(
                "Firebase configuration is incomplete. Follow the setup steps in DEPLOYMENT.md.");
        }

        _module = await js.InvokeAsync<IJSObjectReference>(
            "import", navigation.BaseUri + "js/firebase-bridge.js?v=3");
        _callbackReference = DotNetObjectReference.Create(this);
        UserId = await _module.InvokeAsync<string>("initialize", options, _callbackReference);
    }

    public async Task<string?> GetSavedRoomAsync() =>
        await Module.InvokeAsync<string?>("savedRoom");

    public async Task SaveRoomAsync(string? code) =>
        await Module.InvokeVoidAsync("saveRoom", code);

    public async Task WatchRoomAsync(string code) =>
        await Module.InvokeVoidAsync("watchRoom", code);

    public async Task<bool> CreateRoomAsync(string code) =>
        await Module.InvokeAsync<bool>("createRoom", code);

    public async Task StartRoundAsync(string code, string patternId, string[] cards) =>
        await Module.InvokeVoidAsync("startRound", code, patternId, cards);

    public async Task<bool> DrawAsync(string code) =>
        await Module.InvokeAsync<bool>("drawCard", code);

    public async Task<bool> ChangePhaseAsync(string code, string phase) =>
        await Module.InvokeAsync<bool>("changePhase", code, phase);

    public async Task ChangeThemeAsync(string code, string themeId) =>
        await Module.InvokeVoidAsync("changeTheme", code, themeId);

    public async Task CopyTextAsync(string text) =>
        await Module.InvokeVoidAsync("copyText", text);

    public async Task EnterFullscreenAsync() =>
        await Module.InvokeVoidAsync("enterFullscreen");

    [JSInvokable]
    public void OnRoomChanged(RoomState? state) => RoomChanged?.Invoke(state);

    [JSInvokable]
    public void OnThemeChanged(string themeId) => ThemeChanged?.Invoke(themeId);

    [JSInvokable]
    public void OnConnectionChanged(bool connected)
    {
        IsConnected = connected;
        ConnectionChanged?.Invoke(connected);
    }

    [JSInvokable]
    public void OnClockOffset(long offset) => ServerOffsetMs = offset;

    [JSInvokable]
    public void OnBridgeError(string message) => ErrorReceived?.Invoke(message);

    public async ValueTask DisposeAsync()
    {
        if (_module is not null)
        {
            try
            {
                await _module.InvokeVoidAsync("dispose");
                await _module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
                // The tab is closing.
            }
        }

        _callbackReference?.Dispose();
    }

    private IJSObjectReference Module => _module ??
        throw new InvalidOperationException("Firebase has not been initialized.");

    private sealed class FirebaseOptions
    {
        [JsonPropertyName("apiKey")]
        public string ApiKey { get; set; } = string.Empty;

        [JsonPropertyName("authDomain")]
        public string AuthDomain { get; set; } = string.Empty;

        [JsonPropertyName("databaseURL")]
        public string DatabaseUrl { get; set; } = string.Empty;

        [JsonPropertyName("projectId")]
        public string ProjectId { get; set; } = string.Empty;

        [JsonPropertyName("appId")]
        public string AppId { get; set; } = string.Empty;

        [JsonPropertyName("useEmulators")]
        public bool UseEmulators { get; set; }

        public bool IsComplete =>
            !string.IsNullOrWhiteSpace(ApiKey) &&
            !string.IsNullOrWhiteSpace(AuthDomain) &&
            !string.IsNullOrWhiteSpace(DatabaseUrl) &&
            !string.IsNullOrWhiteSpace(ProjectId) &&
            !string.IsNullOrWhiteSpace(AppId);
    }
}
