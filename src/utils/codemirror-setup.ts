// Simplified CodeMirror setup to avoid version conflicts
export function createCodeMirrorEditor(
	parent: HTMLElement,
	initialValue: string = '',
	onChange?: (value: string) => void
): any {
	// Create a simple textarea for now to avoid CodeMirror version conflicts
	const textarea = document.createElement('textarea');
	textarea.value = initialValue;
	textarea.style.width = '100%';
	textarea.style.height = '200px';
	textarea.style.fontFamily = 'var(--font-monospace)';
	textarea.style.fontSize = '14px';
	textarea.style.padding = '8px';
	textarea.style.border = '1px solid var(--background-modifier-border)';
	textarea.style.borderRadius = '4px';
	textarea.style.backgroundColor = 'var(--background-primary)';
	textarea.style.color = 'var(--text-normal)';
	textarea.style.resize = 'vertical';
	
	if (onChange) {
		textarea.addEventListener('input', () => {
			onChange(textarea.value);
		});
	}
	
	parent.appendChild(textarea);
	
	return {
		destroy: () => {
			textarea.remove();
		},
		getValue: () => textarea.value,
		setValue: (value: string) => {
			textarea.value = value;
		}
	};
}

export function destroyCodeMirrorEditor(editor: any): void {
	if (editor && editor.destroy) {
		editor.destroy();
	}
}