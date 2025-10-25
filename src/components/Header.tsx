import React from 'react';

interface HeaderProps {
	title: string;
	height: number;
}

export const Header: React.FC<HeaderProps> = ({ title, height }) => {
	return (
		<div 
			className="custom-ui-header"
			style={{
				height: `${height}px`,
				backgroundColor: 'var(--background-primary)',
				borderBottom: '1px solid var(--background-modifier-border)',
				display: 'flex',
				alignItems: 'center',
				padding: '0 20px',
				boxSizing: 'border-box',
				zIndex: 1000,
				position: 'relative',
			}}
		>
			<h1 style={{
				margin: 0,
				fontSize: '24px',
				fontWeight: '600',
				color: 'var(--text-normal)',
			}}>
				{title}
			</h1>
		</div>
	);
};