# Custom UI Plugin for Obsidian

A powerful Obsidian plugin that restructures the UI with a custom header, menu bar, and React-based note viewer with CodeMirror integration.

## Features

- **Custom Header**: Add a customizable header to the top of your Obsidian interface
- **Menu Bar**: Create a dropdown menu bar with custom actions and commands
- **Custom Note Viewer**: Replace the default note viewer with React components
- **Form Builder**: Create forms with various field types including:
  - Text inputs
  - Text areas
  - Select dropdowns
  - Checkboxes
  - CodeMirror editors for rich text editing
- **Settings Panel**: Configure all aspects of the custom UI through the settings

## Installation

1. Build the plugin by running `npm run build`
2. Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugin folder:
   ```
   <Vault>/.obsidian/plugins/obsidian-custom-ui-plugin/
   ```
3. Reload Obsidian
4. Enable the plugin in **Settings → Community plugins**

## Usage

### Basic Setup

1. Open **Settings → Community plugins**
2. Find "Custom UI Plugin" and enable it
3. Go to the plugin settings to configure your UI

### Settings

The plugin provides several configuration options:

- **Enable Custom UI**: Toggle the entire custom UI system on/off
- **Show Header**: Enable/disable the custom header
- **Header Height**: Adjust the height of the header (40-100px)
- **Show Menu Bar**: Enable/disable the menu bar
- **Menu Bar Height**: Adjust the height of the menu bar (30-60px)

### Commands

The plugin adds several commands accessible via the Command Palette:

- **Toggle Custom UI**: Enable/disable the custom UI
- **Reload Custom UI**: Reload the custom UI components

### Custom Note Viewer

The custom note viewer includes a form with the following fields:

- **Note Title**: Text input for the note title
- **Note Content**: CodeMirror editor for rich text editing
- **Tags**: Text input for comma-separated tags
- **Category**: Dropdown selection for note categories
- **Important**: Checkbox to mark notes as important

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Custom header component
│   ├── MenuBar.tsx     # Menu bar with dropdowns
│   ├── FormField.tsx   # Individual form field component
│   └── CustomNoteViewer.tsx # Main note viewer component
├── ui/                 # UI management
│   ├── UIManager.ts    # Main UI restructuring logic
│   └── SettingsTab.ts  # Settings panel
├── utils/              # Utility functions
│   └── codemirror-setup.ts # CodeMirror integration
└── types/              # TypeScript type definitions
    └── index.ts
```

### Building

```bash
# Install dependencies
npm install

# Development build with watch mode
npm run dev

# Production build
npm run build
```

### Adding New Form Fields

To add new form field types, modify the `FormField` component in `src/components/FormField.tsx` and add the new type to the `FormField` interface in `src/types/index.ts`.

### Customizing the Menu Bar

Edit the `menuItems` array in `src/ui/UIManager.ts` to add new menu items and actions.

## Technical Details

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety throughout the codebase
- **CodeMirror**: Rich text editing capabilities (simplified implementation to avoid version conflicts)
- **Obsidian API**: Full integration with Obsidian's plugin system
- **CSS Variables**: Uses Obsidian's CSS variables for consistent theming

## Troubleshooting

### Plugin Not Loading

1. Ensure all files (`main.js`, `manifest.json`, `styles.css`) are in the correct plugin folder
2. Check the Obsidian console for any error messages
3. Try reloading the plugin or restarting Obsidian

### UI Not Appearing

1. Check that "Enable Custom UI" is turned on in the plugin settings
2. Try using the "Reload Custom UI" command
3. Ensure the plugin is enabled in the Community plugins list

### Build Issues

1. Make sure all dependencies are installed: `npm install`
2. Check that TypeScript compilation passes: `npm run build`
3. Ensure Node.js version is 18+ (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.