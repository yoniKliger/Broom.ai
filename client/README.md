# Broom.ai

A Chrome extension that allows you to hide important and private context from your AI prompts.

## Features

- Privacy-focused tool for AI interactions
- Hide sensitive information from AI prompts
- TypeScript support
- Modern and user-friendly interface

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `build` directory from this project

## Development

To watch for changes and automatically rebuild:
```bash
npm run dev
```

This will:
- Watch for file changes
- Automatically rebuild in development mode
- Generate source maps for debugging

## Project Structure

```
broom.ai/
├── src/           # TypeScript source files
├── build/         # Compiled extension files
├── package.json   # Project dependencies and scripts
└── webpack.config.js # Build configuration
```

## License

MIT 