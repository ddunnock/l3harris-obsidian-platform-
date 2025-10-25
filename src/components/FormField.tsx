import React, { useEffect, useRef } from 'react';
import { FormField as FormFieldType } from '../types';
import { createCodeMirrorEditor, destroyCodeMirrorEditor } from '../utils/codemirror-setup';

interface FormFieldProps {
	field: FormFieldType;
	onChange: (fieldId: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onChange }) => {
	const codemirrorRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<any>(null);

	useEffect(() => {
		if (field.type === 'codemirror' && codemirrorRef.current) {
			editorRef.current = createCodeMirrorEditor(
				codemirrorRef.current,
				field.value,
				(value) => onChange(field.id, value)
			);
		}

		return () => {
			if (editorRef.current) {
				destroyCodeMirrorEditor(editorRef.current);
			}
		};
	}, [field.type, field.id, onChange]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		onChange(field.id, e.target.value);
	};

	const renderField = () => {
		switch (field.type) {
			case 'text':
				return (
					<input
						type="text"
						value={field.value}
						onChange={handleChange}
						placeholder={field.placeholder}
						required={field.required}
						style={{
							width: '100%',
							padding: '8px 12px',
							border: '1px solid var(--background-modifier-border)',
							borderRadius: '4px',
							backgroundColor: 'var(--background-primary)',
							color: 'var(--text-normal)',
							fontSize: '14px',
						}}
					/>
				);

			case 'textarea':
				return (
					<textarea
						value={field.value}
						onChange={handleChange}
						placeholder={field.placeholder}
						required={field.required}
						rows={4}
						style={{
							width: '100%',
							padding: '8px 12px',
							border: '1px solid var(--background-modifier-border)',
							borderRadius: '4px',
							backgroundColor: 'var(--background-primary)',
							color: 'var(--text-normal)',
							fontSize: '14px',
							resize: 'vertical',
						}}
					/>
				);

			case 'select':
				return (
					<select
						value={field.value}
						onChange={handleChange}
						required={field.required}
						style={{
							width: '100%',
							padding: '8px 12px',
							border: '1px solid var(--background-modifier-border)',
							borderRadius: '4px',
							backgroundColor: 'var(--background-primary)',
							color: 'var(--text-normal)',
							fontSize: '14px',
						}}
					>
						<option value="">Select an option</option>
						{field.options?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				);

			case 'checkbox':
				return (
					<input
						type="checkbox"
						checked={field.value === 'true'}
						onChange={(e) => onChange(field.id, e.target.checked.toString())}
						style={{
							width: '16px',
							height: '16px',
						}}
					/>
				);

			case 'codemirror':
				return (
					<div
						ref={codemirrorRef}
						style={{
							border: '1px solid var(--background-modifier-border)',
							borderRadius: '4px',
							overflow: 'hidden',
						}}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<div style={{ marginBottom: '16px' }}>
			<label
				style={{
					display: 'block',
					marginBottom: '4px',
					fontWeight: '500',
					color: 'var(--text-normal)',
				}}
			>
				{field.label}
				{field.required && <span style={{ color: 'var(--text-error)' }}> *</span>}
			</label>
			{renderField()}
		</div>
	);
};