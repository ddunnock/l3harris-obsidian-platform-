import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuBarProps {
	height: number;
	menuItems: MenuItem[];
}

export const MenuBar: React.FC<MenuBarProps> = ({ height, menuItems }) => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	const handleMouseEnter = (itemId: string) => {
		setActiveDropdown(itemId);
	};

	const handleMouseLeave = () => {
		setActiveDropdown(null);
	};

	const handleItemClick = (item: MenuItem) => {
		if (item.action) {
			item.action();
		}
		setActiveDropdown(null);
	};

	return (
		<div 
			className="custom-ui-menu-bar"
			style={{
				height: `${height}px`,
				backgroundColor: 'var(--background-secondary)',
				borderBottom: '1px solid var(--background-modifier-border)',
				display: 'flex',
				alignItems: 'center',
				padding: '0 20px',
				boxSizing: 'border-box',
				zIndex: 999,
				position: 'relative',
			}}
		>
			{menuItems.map((item) => (
				<div
					key={item.id}
					className="menu-item"
					style={{
						position: 'relative',
						marginRight: '20px',
					}}
					onMouseEnter={() => handleMouseEnter(item.id)}
					onMouseLeave={handleMouseLeave}
				>
					<button
						style={{
							background: 'none',
							border: 'none',
							color: 'var(--text-normal)',
							cursor: 'pointer',
							padding: '8px 12px',
							borderRadius: '4px',
							fontSize: '14px',
						}}
						onClick={() => handleItemClick(item)}
					>
						{item.label}
						{item.submenu && (
							<span style={{ marginLeft: '4px' }}>▼</span>
						)}
					</button>
					
					{item.submenu && activeDropdown === item.id && (
						<div
							className="dropdown-menu"
							style={{
								position: 'absolute',
								top: '100%',
								left: 0,
								backgroundColor: 'var(--background-primary)',
								border: '1px solid var(--background-modifier-border)',
								borderRadius: '4px',
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
								minWidth: '150px',
								zIndex: 1001,
							}}
						>
							{item.submenu.map((subItem) => (
								<button
									key={subItem.id}
									style={{
										display: 'block',
										width: '100%',
										background: 'none',
										border: 'none',
										color: 'var(--text-normal)',
										cursor: 'pointer',
										padding: '8px 12px',
										textAlign: 'left',
										fontSize: '14px',
									}}
									onClick={() => handleItemClick(subItem)}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = 'var(--background-modifier-hover)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = 'transparent';
									}}
								>
									{subItem.label}
								</button>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};