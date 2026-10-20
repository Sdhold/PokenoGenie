using System.Text.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using PokenoGenie.Core;

namespace PokenoGenie.Services;

public sealed class BoardLibraryService(FirebaseRoomService rooms, IJSRuntime js, NavigationManager navigation) : IAsyncDisposable
{
    private IJSObjectReference? _module;
    private DotNetObjectReference<BoardLibraryService>? _reference;
    public event Action? Changed;
    public LibraryEditor Editor { get; private set; } = new();
    public List<BoardSet> Sets { get; private set; } = [];
    public IEnumerable<BoardSet> ActiveSets => Sets.Where(set => !set.Deleted);
    public List<BoardDraft> Drafts { get; private set; } = [];
    public RoundBoards? RoundBoards { get; private set; }
    public BoardCheck? Check { get; private set; }
    public string? LastError { get; private set; }
    public static string FriendlyError(Exception error) => error.Message.Split('\n', 2)[0];

    public async Task InitializeAsync()
    {
        if (_module is not null) return;
        await rooms.InitializeAsync();
        _module = await js.InvokeAsync<IJSObjectReference>("import", navigation.BaseUri + "js/board-library.js?v=6");
        _reference = DotNetObjectReference.Create(this);
        await _module.InvokeVoidAsync("initializeLibrary", _reference);
    }

    public async Task RefreshAsync() => await Module.InvokeVoidAsync("refreshLibrary");
    public async Task OpenEditorAsync() => await Module.InvokeVoidAsync("initializeEditor");
    public async Task WatchRoomAsync(string code) => await Module.InvokeVoidAsync("watchBoards", code);
    public async Task<string> CreateSetAsync(string name) => await Module.InvokeAsync<string>("createSet", name.Trim());

    public async Task<string> CopySetAsync(string setId)
    {
        var source = ActiveSets.FirstOrDefault(set => set.Id == setId) ?? throw new InvalidOperationException("Choose an active board set to copy.");
        var revisions = new List<BoardRevision>();
        foreach (var pair in source.Boards.Where(pair => !pair.Value.Archived))
            revisions.Add(await RevisionAsync(pair.Key, pair.Value.RevisionId));
        var copyId = await CreateSetAsync(source.Name[..Math.Min(source.Name.Length, 53)] + " (copy)");
        foreach (var board in revisions)
            await PublishAsync(new() { SetId = copyId, Label = board.Label, Cards = [.. board.Cards] });
        await RefreshAsync();
        return copyId;
    }
    public async Task SaveDraftAsync(BoardDraft draft) => await Module.InvokeVoidAsync("saveDraft", draft);
    public async Task SaveLocalDraftAsync(BoardDraft draft) => await Module.InvokeVoidAsync("saveLocalDraft", draft);
    public async Task<List<BoardDraft>> LocalDraftsAsync() => await Module.InvokeAsync<List<BoardDraft>>("localDrafts");
    public async Task DiscardDraftAsync(string id) => await Module.InvokeVoidAsync("discardDraft", id);
    public async Task<BoardRevision> RevisionAsync(string boardId, string revisionId) =>
        await Module.InvokeAsync<BoardRevision>("getRevision", boardId, revisionId);

    public async Task PublishAsync(BoardDraft draft)
    {
        var errors = BoardLayouts.Validate(draft.Cards);
        if (errors.Count > 0) throw new InvalidOperationException(string.Join(" ", errors));
        await Module.InvokeVoidAsync("publishBoard", draft, BoardLayouts.Hash(draft.Cards));
    }

    public async Task ArchiveAsync(string setId, string boardId, string revisionId, bool archived) =>
        await Module.InvokeVoidAsync("archiveBoard", setId, boardId, revisionId, archived);
    public async Task SetDeletedAsync(string setId, bool deleted)
    {
        await Module.InvokeVoidAsync("setDeleted", setId, deleted);
        await RefreshAsync();
    }
    public async Task SelectRoundSetAsync(string code, string setId) => await Module.InvokeVoidAsync("selectRoundSet", code, setId);
    public async Task PrepareRoundAsync(string code, string setId) => await Module.InvokeVoidAsync("selectRoundSet", code, setId, true);
    public async Task CheckAsync(string code, string boardId) => await Module.InvokeVoidAsync("checkBoard", code, boardId);
    public async Task ClearCheckAsync(string code) => await Module.InvokeVoidAsync("clearCheck", code);

    public async Task ExportAsync(string setId) => await Module.InvokeVoidAsync("exportSet", setId);
    public async Task PrintAsync(string setId, string themeId) => await Module.InvokeVoidAsync("printSet", setId, themeId);

    [JSInvokable] public void OnLibrarySets(List<BoardSet> sets) { Sets = sets; LastError = null; Changed?.Invoke(); }
    [JSInvokable] public void OnLibraryError(string message) { LastError = message; Changed?.Invoke(); }
    [JSInvokable] public void OnLibraryEditor(LibraryEditor editor) { Editor = editor; Changed?.Invoke(); }
    [JSInvokable] public void OnLibraryDrafts(List<BoardDraft> drafts) { Drafts = drafts; Changed?.Invoke(); }
    [JSInvokable] public void OnRoundBoards(RoundBoards? boards) { RoundBoards = boards; Changed?.Invoke(); }
    [JSInvokable] public void OnBoardCheck(BoardCheck? check) { Check = check; Changed?.Invoke(); }

    private IJSObjectReference Module => _module ?? throw new InvalidOperationException("Open the board library first.");
    public async ValueTask DisposeAsync()
    {
        if (_module is not null)
        {
            try { await _module.InvokeVoidAsync("disposeLibrary"); await _module.DisposeAsync(); }
            catch (JSDisconnectedException) { }
        }
        _reference?.Dispose();
    }
}
