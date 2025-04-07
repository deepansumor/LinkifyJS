# LinkifyJS

LinkifyJS is a lightweight JavaScript library that allows users to select text within a container and convert it into hyperlinks using a beautiful inline tooltip. It's perfect for editors, CMS platforms, documentation tools, and more.

## Features

✅ Intuitive text selection with tooltip-based editing  
✅ Add or remove hyperlinks dynamically  
✅ Fully customizable tooltip (labels, styles, classNames)  
✅ Works with `contentEditable` elements  
✅ Retains selection range for accurate text replacement  
✅ Auto-adjusts tooltip position based on available space  

## Installation

### LOCAL
```html
<script src="../dist/linkify.min.js"></script>
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/gh/deepansumor/LinkifyJS@latest/dist/linkify.min.js"></script>
```

## Usage

### Basic Example
```js
import LinkifyJS from './LinkifyJS';

LinkifyJS.init(document.querySelector(".editable-container"));
```

### With Configuration
```js
LinkifyJS.init(document.querySelector(".editable-container"), {
    labelText: "Display Text",
    labelURL: "Hyperlink URL",
    placeholderText: "Enter text...",
    placeholderURL: "https://example.com",
    classNames: {
        tooltip: "my-tooltip",
        input: "my-input",
        label: "my-label",
        submit: "my-submit",
        remove: "my-remove"
    },
    styles: {
        tooltip: { background: "#f9f9f9", borderColor: "#333" },
        input: { fontSize: "16px" },
        submit: { background: "#2196f3" },
        remove: { background: "#e91e63" }
    }
});
```

## API Reference

### `LinkifyJS.init(container: HTMLElement, config?: LinkifyConfig)`
Initializes the LinkifyJS tooltip on a container.

| Option | Type | Description |
|--------|------|-------------|
| `labelText` | `string` | Label text for the name field |
| `labelURL` | `string` | Label text for the URL field |
| `placeholderText` | `string` | Placeholder for name input |
| `placeholderURL` | `string` | Placeholder for URL input |
| `classNames` | `object` | Optional CSS classes for tooltip elements |
| `styles` | `object` | Optional inline styles for tooltip elements |

---

## Tooltip Behavior

- Appears on text selection
- Detects and displays existing anchor (`<a>`) data
- Allows removal of hyperlinks
- Positions itself *above* selected text if space is available, otherwise below
- Ensures selection is not visually obstructed

---

## Contributing

1. Fork the repo  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Add feature"`)  
4. Push the branch (`git push origin feature-name`)  
5. Open a Pull Request  

---

## License

MIT License