import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

export function createCodeMirrorEditor(
	parent: HTMLElement,
	initialValue: string = '',
	onChange?: (value: string) => void
): EditorView {
	// Check if we're in dark mode
	const isDarkMode = document.body.classList.contains('theme-dark') || 
		document.body.classList.contains('obsidian-theme-dark');
	
	const extensions = [
		basicSetup,
		markdown(),
		keymap.of(defaultKeymap),
		EditorView.updateListener.of((update) => {
			if (update.docChanged && onChange) {
				onChange(update.state.doc.toString());
			}
		}),
		EditorView.theme({
			'&': {
				fontSize: '14px',
				fontFamily: 'var(--font-monospace)',
			},
			'.cm-content': {
				padding: '8px',
				minHeight: '200px',
			},
			'.cm-focused': {
				outline: 'none',
			},
			'.cm-editor': {
				border: '1px solid var(--background-modifier-border)',
				borderRadius: '4px',
			},
			'.cm-editor.cm-focused': {
				borderColor: 'var(--interactive-accent)',
				boxShadow: '0 0 0 2px rgba(var(--interactive-accent-rgb), 0.2)',
			},
		}),
	];

	// Add dark theme if needed
	if (isDarkMode) {
		extensions.push(oneDark);
	}

	const state = EditorState.create({
		doc: initialValue,
		extensions,
	});

	const view = new EditorView({
		state,
		parent,
	});

	return view;
}

export function destroyCodeMirrorEditor(editor: EditorView): void {
	if (editor) {
		editor.destroy();
	}
}