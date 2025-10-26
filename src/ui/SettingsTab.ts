import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CustomUISettings, DEFAULT_SETTINGS } from '../types';

export class CustomUISettingsTab extends PluginSettingTab {
	plugin: Plugin;
	settings: CustomUISettings;

	constructor(app: App, plugin: Plugin, settings: CustomUISettings) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = settings;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Custom UI Settings' });

		new Setting(containerEl)
			.setName('Enable Custom UI')
			.setDesc('Enable the custom UI with header, menu bar, and custom note viewer')
			.addToggle(toggle => toggle
				.setValue(this.settings.enableCustomUI)
				.onChange(async (value) => {
					this.settings.enableCustomUI = value;
					await this.saveSettings();
					// Trigger UI update
					(this.plugin as any).uiManager?.updateSettings(this.settings);
				}));

		new Setting(containerEl)
			.setName('Show Header')
			.setDesc('Show the custom header at the top of the interface')
			.addToggle(toggle => toggle
				.setValue(this.settings.showHeader)
				.onChange(async (value) => {
					this.settings.showHeader = value;
					await this.saveSettings();
					(this.plugin as any).uiManager?.updateSettings(this.settings);
				}));

	new Setting(containerEl)
		.setName('Header Height')
		.setDesc('Height of the header in pixels')
		.addSlider(slider => slider
			.setLimits(40, 100, 5)
			.setValue(this.settings.headerHeight)
			.setDynamicTooltip()
			.onChange(async (value) => {
				if (value >= 40 && value <= 100) {
					this.settings.headerHeight = value;
					await this.saveSettings();
					(this.plugin as any).uiManager?.updateSettings(this.settings);
				}
			}));

		new Setting(containerEl)
			.setName('Show Menu Bar')
			.setDesc('Show the custom menu bar below the header')
			.addToggle(toggle => toggle
				.setValue(this.settings.showMenuBar)
				.onChange(async (value) => {
					this.settings.showMenuBar = value;
					await this.saveSettings();
					(this.plugin as any).uiManager?.updateSettings(this.settings);
				}));

	new Setting(containerEl)
		.setName('Menu Bar Height')
		.setDesc('Height of the menu bar in pixels')
		.addSlider(slider => slider
			.setLimits(30, 60, 5)
			.setValue(this.settings.menuBarHeight)
			.setDynamicTooltip()
			.onChange(async (value) => {
				if (value >= 30 && value <= 60) {
					this.settings.menuBarHeight = value;
					await this.saveSettings();
					(this.plugin as any).uiManager?.updateSettings(this.settings);
				}
			}));

		containerEl.createEl('h3', { text: 'About' });
		containerEl.createEl('p', { 
			text: 'This plugin provides a custom UI for Obsidian with React components and CodeMirror integration. The custom note viewer allows you to create forms with various field types including CodeMirror editors for rich text editing.' 
		});
	}

	private async saveSettings(): Promise<void> {
		try {
			// Validate settings before saving
			this.validateSettings();
			await (this.plugin as any).saveData(this.settings);
		} catch (error) {
			console.error('Error saving settings:', error);
			// Show error notification
			new (this.app as any).Notice('Error saving settings. Please try again.');
		}
	}

	private validateSettings(): void {
		// Validate header height
		if (this.settings.headerHeight < 40 || this.settings.headerHeight > 100) {
			throw new Error('Header height must be between 40 and 100 pixels');
		}
		
		// Validate menu bar height
		if (this.settings.menuBarHeight < 30 || this.settings.menuBarHeight > 60) {
			throw new Error('Menu bar height must be between 30 and 60 pixels');
		}
	}
}