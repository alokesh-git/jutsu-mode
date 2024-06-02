import * as vscode from 'vscode';
import { getConfigValue } from '../../config/config';
import { Plugin, jutsupowerChangeTextDocumentEventData } from '../../plugin';
import { EditorComboMeterConfig } from '../editor-combo-meter';

export class StatusBarComboMeter implements Plugin<EditorComboMeterConfig> {

    private config: EditorComboMeterConfig | undefined;
    private statusBarItem: vscode.StatusBarItem;

    dispose = () => {
        if (!this.statusBarItem) {
            return;
        }
        this.statusBarItem.dispose();
        this.statusBarItem = null;
    }

    public onjutsupowerStart = (combo: number) => {
        // Do nothing
    }

    public onjutsupowerStop = (combo: number) => {
        // Do nothing
    }

    public onComboStart = (combo: number) => {
        this.updateStatusBar(combo);
    }

    public onComboStop = (combo: number) => {
        this.updateStatusBar(combo);
    }

    public onDidChangeTextDocument = (data: jutsupowerChangeTextDocumentEventData, event: vscode.TextDocumentChangeEvent) => {
        this.updateStatusBar(data.currentCombo, data.isjutsupowerActive);
    }

    public onDidChangeConfiguration = (config: EditorComboMeterConfig) => {
        if (this.config?.enableComboCounter === config.enableComboCounter) {
            return;
        }

        this.config = config;

        if (this.config.enableComboCounter) {
            this.activate();
        } else {
            this.dispose();
        }
    }

    private activate = () => {
        if (this.statusBarItem) {
            return;
        }
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.statusBarItem.show();
    }

    private updateStatusBar = (combo: number, jutsupower?: boolean) => {
        if (!this.statusBarItem) {
            return;
        }
        const prefix = jutsupower ? 'jutsu power!!! ' : '';
        this.statusBarItem.text = `${prefix}Combo: ${combo}`;
    }
}