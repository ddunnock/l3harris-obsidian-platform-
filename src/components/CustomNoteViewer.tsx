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
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (fieldId: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[fieldId]: value,
		}));
		onFieldChange(fieldId, value);
		
		// Clear error when user starts typing
		if (errors[fieldId]) {
			setErrors(prev => ({
				...prev,
				[fieldId]: '',
			}));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};
		
		formFields.forEach(field => {
			if (field.required && (!formData[field.id] || formData[field.id].trim() === '')) {
				newErrors[field.id] = `${field.label} is required`;
			}
		});
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}
		
		setIsSubmitting(true);
		try {
			await onSubmit(formData);
			// Reset form after successful submission
			const resetData = formFields.reduce((acc, field) => {
				acc[field.id] = field.value;
				return acc;
			}, {} as Record<string, string>);
			setFormData(resetData);
			setErrors({});
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
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
					<div key={field.id}>
						<FormFieldComponent
							field={field}
							onChange={handleFieldChange}
						/>
						{errors[field.id] && (
							<div style={{
								color: 'var(--text-error)',
								fontSize: '12px',
								marginTop: '4px',
								marginLeft: '4px',
							}}>
								{errors[field.id]}
							</div>
						)}
					</div>
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
					disabled={isSubmitting}
					style={{
						backgroundColor: isSubmitting ? 'var(--background-modifier-border)' : 'var(--interactive-accent)',
						color: isSubmitting ? 'var(--text-muted)' : 'var(--text-on-accent)',
						border: 'none',
						padding: '10px 20px',
						borderRadius: '4px',
						cursor: isSubmitting ? 'not-allowed' : 'pointer',
						fontSize: '14px',
						fontWeight: '500',
						opacity: isSubmitting ? 0.7 : 1,
					}}
				>
					{isSubmitting ? 'Saving...' : 'Save Note'}
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