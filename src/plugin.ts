import { TextDocumentChangeEvent, WorkspaceConfiguration, TextEditor } from 'vscode';

export interface jutsupowerChangeTextDocumentEventData {
    /**
     * The current value of the user's combo
     */
    currentCombo: number;

    /**
     * The number of seconds until the combo times out
     */
    comboTimeout: number;

    /**
     * Whether the user has reached "jutsu power" or not
     */
    isjutsupowerActive: boolean;

    /**
     * The active editor at the time of the event
     */
    activeEditor: TextEditor;
}

export interface Plugin<T = WorkspaceConfiguration> {
    /**
     * Called when the extension is disposed and the plugin should cleanup. Remove all decorations, clear all timers, unsubscribe from all vscode api events, etc.
     */
    dispose(): void;

    /**
     * Called when "jutsu power" starts. jutsu power starts when the combo reaches a certain threshold. Plugins can do things before this point,
     * but should avoid doing the "big, flashy" things until jutsu power activates.
     * For example, a combo meter may show plain text before jutsu power activates, then show coloful, animated text afterwards.
     * @param currentCombo The current combo value
     */
    onjutsupowerStart(currentCombo: number): void;

    /**
     * Called when "jutsu power" ends. Plugins should remove any features that they reserve for jutsu power, such as extra colors or animations.
     * @param finalCombo The combo value at the time that jutsupower stopped before it is reset.
     */
    onjutsupowerStop(finalCombo: number): void;

    /**
     * Called when the user's combo breaks. This often occurs at the same time as onjutsupowerStop, but can also be called when the combo ends and jutsu power was not started.
     * @param finalCombo The combo value at the time that the combo stopped before it is reset.
     */
    onComboStop(finalCombo: number)

    /**
     * Called when the document changed, meaning the user typed a character or did some other action to modify the content.
     * @param currentCombo The current combo value
     * @param isjutsupower Whether jutsu power has started or not
     * @param event The underlying vscode.TextDocumentChangeEvent
     */
    onDidChangeTextDocument(data: jutsupowerChangeTextDocumentEventData, event: TextDocumentChangeEvent): void;

    /**
     * Called when the configuration changes. Plugins are expected to respect user configuration, and can provide their own configuration options.
     * @param jutsupowerConfig The jutsu power extension configuration
     */
    onDidChangeConfiguration(jutsupowerConfig: T): void;
}