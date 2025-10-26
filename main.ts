import { App, Notice, Plugin } from 'obsidian';
import { CustomUISettings, DEFAULT_SETTINGS } from './src/types';
import { UIManager } from './src/ui/UIManager';
import { CustomUISettingsTab } from './src/ui/SettingsTab';

export default class CustomUIPlugin extends Plugin {
	settings: CustomUISettings;
	uiManager: UIManager | null = null;

	async onload() {
		await this.loadSettings();

		// Initialize UI Manager
		this.uiManager = new UIManager(this.app, this.settings);

		// Add commands
		this.addCommand({
			id: 'toggle-custom-ui',
			name: 'Toggle Custom UI',
			callback: () => {
				this.settings.enableCustomUI = !this.settings.enableCustomUI;
				this.saveSettings();
				if (this.settings.enableCustomUI) {
					this.uiManager?.initialize();
					new Notice('Custom UI enabled');
				} else {
					this.uiManager?.cleanup();
					new Notice('Custom UI disabled');
				}
			}
		});

		this.addCommand({
			id: 'reload-custom-ui',
			name: 'Reload Custom UI',
			callback: async () => {
				await this.uiManager?.cleanup();
				await this.uiManager?.initialize();
				new Notice('Custom UI reloaded');
			}
		});

		this.addCommand({
			id: 'create-note-from-form',
			name: 'Create Note from Form',
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'n' }],
			callback: () => {
				// This will be handled by the form submission
				console.log('Create note from form command triggered');
			}
		});

		this.addCommand({
			id: 'toggle-menu-bar',
			name: 'Toggle Menu Bar',
			hotkeys: [{ modifiers: ['Mod', 'Alt'], key: 'm' }],
			callback: () => {
				this.settings.showMenuBar = !this.settings.showMenuBar;
				this.saveSettings();
				this.uiManager?.updateSettings(this.settings);
				new Notice(`Menu bar ${this.settings.showMenuBar ? 'enabled' : 'disabled'}`);
			}
		});

		// Add settings tab
		this.addSettingTab(new CustomUISettingsTab(this.app, this, this.settings));

		// Initialize UI if enabled
		if (this.settings.enableCustomUI) {
			await this.uiManager.initialize();
		}

		console.log('Custom UI Plugin loaded');
	}

	onunload() {
		if (this.uiManager) {
			this.uiManager.cleanup();
		}
		console.log('Custom UI Plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
