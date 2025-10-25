import { App, Workspace } from 'obsidian';
import { createRoot, Root } from 'react-dom/client';
import React from 'react';
import { Header } from '../components/Header';
import { MenuBar } from '../components/MenuBar';
import { CustomNoteViewer } from '../components/CustomNoteViewer';
import { CustomUISettings, MenuItem, FormField } from '../types';

export class UIManager {
	private app: App;
	private settings: CustomUISettings;
	private root: Root | null = null;
	private originalWorkspace: HTMLElement | null = null;
	private customContainer: HTMLElement | null = null;
	private headerContainer: HTMLElement | null = null;
	private menuBarContainer: HTMLElement | null = null;
	private noteViewerContainer: HTMLElement | null = null;

	constructor(app: App, settings: CustomUISettings) {
		this.app = app;
		this.settings = settings;
	}

	async initialize(): Promise<void> {
		if (!this.settings.enableCustomUI) {
			return;
		}

		await this.restructureUI();
		this.setupEventListeners();
	}

	private async restructureUI(): Promise<void> {
		// Get the main workspace element
		const workspaceEl = this.app.workspace.containerEl;
		this.originalWorkspace = workspaceEl;

		// Create the custom container
		this.customContainer = workspaceEl.createDiv({
			cls: 'custom-ui-container',
			attr: {
				style: 'display: flex; flex-direction: column; height: 100vh;'
			}
		});

		// Create header if enabled
		if (this.settings.showHeader) {
			this.headerContainer = this.customContainer.createDiv({
				cls: 'custom-ui-header-container'
			});
		}

		// Create menu bar if enabled
		if (this.settings.showMenuBar) {
			this.menuBarContainer = this.customContainer.createDiv({
				cls: 'custom-ui-menu-bar-container'
			});
		}

		// Create the main content area
		const mainContentArea = this.customContainer.createDiv({
			cls: 'custom-ui-main-content',
			attr: {
				style: 'display: flex; flex: 1; overflow: hidden;'
			}
		});

		// Create the custom note viewer
		this.noteViewerContainer = mainContentArea.createDiv({
			cls: 'custom-ui-note-viewer',
			attr: {
				style: 'flex: 1;'
			}
		});

		// Hide the original workspace content
		const originalContent = workspaceEl.querySelector('.workspace-split') as HTMLElement;
		if (originalContent) {
			originalContent.style.display = 'none';
		}

		// Render React components
		await this.renderComponents();
	}

	private async renderComponents(): Promise<void> {
		// Render header
		if (this.headerContainer) {
			const headerRoot = createRoot(this.headerContainer);
			headerRoot.render(
				React.createElement(Header, {
					title: 'Custom Obsidian UI',
					height: this.settings.headerHeight,
				})
			);
		}

		// Render menu bar
		if (this.menuBarContainer) {
			const menuBarRoot = createRoot(this.menuBarContainer);
			const menuItems: MenuItem[] = [
				{
					id: 'file',
					label: 'File',
					submenu: [
						{ id: 'new-note', label: 'New Note', action: () => this.createNewNote() },
						{ id: 'open-note', label: 'Open Note', action: () => this.openNote() },
						{ id: 'save-note', label: 'Save Note', action: () => this.saveNote() },
					]
				},
				{
					id: 'edit',
					label: 'Edit',
					submenu: [
						{ id: 'undo', label: 'Undo', action: () => this.undo() },
						{ id: 'redo', label: 'Redo', action: () => this.redo() },
						{ id: 'find', label: 'Find', action: () => this.find() },
					]
				},
				{
					id: 'view',
					label: 'View',
					submenu: [
						{ id: 'toggle-sidebar', label: 'Toggle Sidebar', action: () => this.toggleSidebar() },
						{ id: 'toggle-menu', label: 'Toggle Menu Bar', action: () => this.toggleMenuBar() },
					]
				},
				{
					id: 'help',
					label: 'Help',
					action: () => this.showHelp()
				}
			];

			menuBarRoot.render(
				React.createElement(MenuBar, {
					height: this.settings.menuBarHeight,
					menuItems,
				})
			);
		}

		// Render custom note viewer
		if (this.noteViewerContainer) {
			this.root = createRoot(this.noteViewerContainer);
			
			const formFields: FormField[] = [
				{
					id: 'title',
					label: 'Note Title',
					type: 'text',
					value: '',
					placeholder: 'Enter note title',
					required: true,
				},
				{
					id: 'content',
					label: 'Note Content',
					type: 'codemirror',
					value: '',
					placeholder: 'Write your note content here...',
				},
				{
					id: 'tags',
					label: 'Tags',
					type: 'text',
					value: '',
					placeholder: 'Enter tags separated by commas',
				},
				{
					id: 'category',
					label: 'Category',
					type: 'select',
					value: '',
					options: ['Personal', 'Work', 'Ideas', 'Research', 'Other'],
				},
				{
					id: 'isImportant',
					label: 'Important',
					type: 'checkbox',
					value: 'false',
				},
			];

			this.root.render(
				React.createElement(CustomNoteViewer, {
					formFields,
					onFieldChange: (fieldId: string, value: string) => this.handleFieldChange(fieldId, value),
					onSubmit: (data: Record<string, string>) => this.handleFormSubmit(data),
				})
			);
		}
	}

	private setupEventListeners(): void {
		// Listen for workspace changes
		this.app.workspace.on('layout-change', () => {
			// Handle layout changes if needed
		});
	}

	private handleFieldChange(fieldId: string, value: string): void {
		console.log(`Field ${fieldId} changed to:`, value);
		// Handle field changes
	}

	private handleFormSubmit(data: Record<string, string>): void {
		console.log('Form submitted with data:', data);
		// Handle form submission
		this.app.workspace.openLinkText('', '', true);
	}

	// Menu actions
	private createNewNote(): void {
		console.log('Creating new note');
		// Implementation for creating new note
	}

	private openNote(): void {
		console.log('Opening note');
		// Implementation for opening note
	}

	private saveNote(): void {
		console.log('Saving note');
		// Implementation for saving note
	}

	private undo(): void {
		console.log('Undo');
		// Implementation for undo
	}

	private redo(): void {
		console.log('Redo');
		// Implementation for redo
	}

	private find(): void {
		console.log('Find');
		// Implementation for find
	}

	private toggleSidebar(): void {
		console.log('Toggle sidebar');
		// Implementation for toggling sidebar
	}

	private toggleMenuBar(): void {
		console.log('Toggle menu bar');
		// Implementation for toggling menu bar
	}

	private showHelp(): void {
		console.log('Show help');
		// Implementation for showing help
	}

	async cleanup(): Promise<void> {
		if (this.root) {
			this.root.unmount();
			this.root = null;
		}

		// Restore original workspace
		if (this.originalWorkspace && this.customContainer) {
			const originalContent = this.originalWorkspace.querySelector('.workspace-split') as HTMLElement;
			if (originalContent) {
				originalContent.style.display = '';
			}
			this.customContainer.remove();
		}
	}

	updateSettings(newSettings: CustomUISettings): void {
		this.settings = newSettings;
		// Re-render components with new settings
		this.renderComponents();
	}
}