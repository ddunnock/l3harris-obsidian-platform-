export interface CustomUISettings {
	enableCustomUI: boolean;
	headerHeight: number;
	menuBarHeight: number;
	showHeader: boolean;
	showMenuBar: boolean;
}

export const DEFAULT_SETTINGS: CustomUISettings = {
	enableCustomUI: true,
	headerHeight: 60,
	menuBarHeight: 40,
	showHeader: true,
	showMenuBar: true,
};

export interface MenuItem {
	id: string;
	label: string;
	submenu?: MenuItem[];
	action?: () => void;
}

export interface FormField {
	id: string;
	label: string;
	type: 'text' | 'textarea' | 'select' | 'checkbox' | 'codemirror';
	value: string;
	options?: string[];
	placeholder?: string;
	required?: boolean;
}