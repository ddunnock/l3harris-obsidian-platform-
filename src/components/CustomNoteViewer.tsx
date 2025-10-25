import React, { useState } from 'react';
import { FormField, FormField as FormFieldType } from '../types';
import { FormField as FormFieldComponent } from './FormField';

interface CustomNoteViewerProps {
	formFields: FormFieldType[];
	onFieldChange: (fieldId: string, value: string) => void;
	onSubmit: (data: Record<string, string>) => void;
}

export const CustomNoteViewer: React.FC<CustomNoteViewerProps> = ({
	formFields,
	onFieldChange,
	onSubmit,
}) => {
	const [formData, setFormData] = useState<Record<string, string>>(
		formFields.reduce((acc, field) => {
			acc[field.id] = field.value;
			return acc;
		}, {} as Record<string, string>)
	);

	const handleFieldChange = (fieldId: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[fieldId]: value,
		}));
		onFieldChange(fieldId, value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div
			className="custom-note-viewer"
			style={{
				flex: 1,
				padding: '20px',
				backgroundColor: 'var(--background-primary)',
				overflow: 'auto',
			}}
		>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '24px' }}>
					<h2 style={{
						margin: '0 0 16px 0',
						fontSize: '20px',
						fontWeight: '600',
						color: 'var(--text-normal)',
					}}>
						Custom Note Form
					</h2>
					<p style={{
						margin: '0 0 20px 0',
						color: 'var(--text-muted)',
						fontSize: '14px',
					}}>
						This is a custom note viewer with React components and CodeMirror integration.
					</p>
				</div>

				<div style={{ marginBottom: '24px' }}>
					{formFields.map((field) => (
						<FormFieldComponent
							key={field.id}
							field={field}
							onChange={handleFieldChange}
						/>
					))}
				</div>

				<div style={{
					display: 'flex',
					gap: '12px',
					paddingTop: '20px',
					borderTop: '1px solid var(--background-modifier-border)',
				}}>
					<button
						type="submit"
						style={{
							backgroundColor: 'var(--interactive-accent)',
							color: 'var(--text-on-accent)',
							border: 'none',
							padding: '10px 20px',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '14px',
							fontWeight: '500',
						}}
					>
						Save Note
					</button>
					<button
						type="button"
						onClick={() => {
							// Reset form
							formFields.forEach(field => {
								handleFieldChange(field.id, field.value);
							});
						}}
						style={{
							backgroundColor: 'var(--background-secondary)',
							color: 'var(--text-normal)',
							border: '1px solid var(--background-modifier-border)',
							padding: '10px 20px',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '14px',
						}}
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};