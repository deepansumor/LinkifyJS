/**
 * Tooltip Module for LinkifyJS
 * Dynamically renders a tooltip to allow users to link selected text with custom display text and URL.
 * Supports optional removal of existing links and customizable styles and class names.
 */

import { handleSelection } from './selectionHandler';

// Default styling for tooltip container
const tooltipStyles: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    padding: '8px',
    background: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderRadius: '4px',
    fontFamily: 'Arial',
    pointerEvents: 'auto',
};

// Default styling for input fields
const inputStyles: Partial<CSSStyleDeclaration> = {
    padding: '6px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
};

// Default styling for the submit button
const submitButtonStyles: Partial<CSSStyleDeclaration> = {
    padding: '6px 10px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

// Default styling for the remove button
const removeButtonStyles: Partial<CSSStyleDeclaration> = {
    padding: '6px 10px',
    background: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

// Label styling
const labelStyles: Partial<CSSStyleDeclaration> = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    gap: '4px',
    marginBottom: '10px'
};

/**
 * Initializes the tooltip for text selection and link insertion.
 * 
 * @param {Range | null} range - The saved text selection range.
 * @param {string} selectedText - The actual selected text content.
 * @param {LinkifyConfig} config - Configuration object (classNames, placeholders, etc).
 * @param {{ x: number, y: number }} position - Mouse position to place the tooltip near.
 * @param {HTMLAnchorElement | null} [existingLink] - If editing an existing link, pass the anchor element.
 */
export function initTooltip(
    range: Range | null,
    selectedText: string,
    config: LinkifyConfig = {},
    position: { x: number, y: number },
    existingLink?: HTMLAnchorElement | null
) {
    const {
        labelText = 'Text',
        labelURL = 'URL',
        placeholderText = 'Text',
        placeholderURL = 'URL',
        classNames = {},
        styles = {},
    } = config;

    if (!range) return;

    // Remove existing tooltip if one is already open
    const existingTooltip = document.querySelector('.linkify-tooltip');
    if (existingTooltip) existingTooltip.remove();

    // Create tooltip container
    const tooltip = document.createElement('div');
    tooltip.className = classNames.tooltip || 'linkify-tooltip';
    tooltip.style.visibility = 'hidden';
    Object.assign(tooltip.style, tooltipStyles, styles.tooltip);

    // === Input for display text ===
    const nameLabel = document.createElement('label');
    nameLabel.className = classNames.label || 'linkify-label';
    nameLabel.textContent = labelText;
    Object.assign(nameLabel.style, labelStyles, styles.label);

    const nameInput = document.createElement('input');
    nameInput.className = classNames.input || 'linkify-input';
    nameInput.placeholder = placeholderText;
    nameInput.value = existingLink?.innerText || selectedText;
    Object.assign(nameInput.style, inputStyles, styles.input);
    nameLabel.appendChild(nameInput);

    // === Input for URL ===
    const urlLabel = document.createElement('label');
    urlLabel.className = classNames.label || 'linkify-label';
    urlLabel.textContent = labelURL;
    Object.assign(urlLabel.style, labelStyles, styles.label);

    const urlInput = document.createElement('input');
    urlInput.className = classNames.input || 'linkify-input';
    urlInput.placeholder = placeholderURL;
    urlInput.value = existingLink?.href || '';
    Object.assign(urlInput.style, inputStyles, styles.input);
    urlLabel.appendChild(urlInput);

    // === Submit button ===
    const submitBtn = document.createElement('button');
    submitBtn.className = classNames.submit || 'linkify-submit';
    submitBtn.innerText = 'Submit';
    submitBtn.onclick = () => {
        const name = nameInput.value;
        const href = urlInput.value;
        if (name && href) {
            handleSelection(range, name, href, config);
            tooltip.remove();
        }
    };
    Object.assign(submitBtn.style, submitButtonStyles, styles.submit);

    // Add all created elements to the tooltip
    tooltip.appendChild(nameLabel);
    tooltip.appendChild(urlLabel);
    tooltip.appendChild(submitBtn);

    // === Remove link button (if editing existing link) ===
    if (existingLink) {
        const removeBtn = document.createElement('button');
        removeBtn.className = classNames.remove || 'linkify-remove';
        removeBtn.innerText = 'Remove Link';
        removeBtn.onclick = () => {
            const textNode = document.createTextNode(existingLink.innerText);
            existingLink.parentNode?.replaceChild(textNode, existingLink);
            tooltip.remove();
        };
        Object.assign(removeBtn.style, removeButtonStyles, styles.remove);
        tooltip.appendChild(removeBtn);
    }

    if (!(config.container instanceof HTMLElement)) {
        config.container = document.body;
    }

    // Attach tooltip to the DOM early to get dimensions
    config.container.appendChild(tooltip);

    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.visibility = 'visible';

    // === Positioning Logic ===
    let top = position.y + 8; // below cursor
    let left = position.x;

    // Adjust to top if there's not enough space below
    if (top + tooltipRect.height > window.innerHeight) {
        top = position.y - tooltipRect.height - 8;
    }

    // Prevent overflow on right
    if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8;
    }

    // Minimum padding from edges
    if (left < 8) left = 8;
    if (top < 8) top = 8;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // === Close on outside click ===
    const onClickOutside = (e: MouseEvent) => {
        if (!tooltip.contains(e.target as Node)) {
            tooltip.remove();
            document.removeEventListener('mousedown', onClickOutside);
        }
    };

    // Delay binding to avoid instant removal when clicking selection
    setTimeout(() => {
        document.addEventListener('mousedown', onClickOutside);
    }, 0);

    // Close tooltip on Escape key press
    const escKeyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            tooltip.remove();
            document.removeEventListener('keydown', escKeyHandler);
        }
    };

    document.addEventListener('keydown', escKeyHandler);

}
