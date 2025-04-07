/**
 * Tooltip Module for LinkifyJS
 * Dynamically renders a tooltip to allow users to link selected text with custom display text and URL.
 * Supports optional removal of existing links and customizable styles and class names.
 */
/**
 * Initializes the tooltip for text selection and link insertion.
 *
 * @param {Range | null} range - The saved text selection range.
 * @param {string} selectedText - The actual selected text content.
 * @param {LinkifyConfig} config - Configuration object (classNames, placeholders, etc).
 * @param {{ x: number, y: number }} position - Mouse position to place the tooltip near.
 * @param {HTMLAnchorElement | null} [existingLink] - If editing an existing link, pass the anchor element.
 */
export declare function initTooltip(range: Range | null, selectedText: string, config: LinkifyConfig | undefined, position: {
    x: number;
    y: number;
}, existingLink?: HTMLAnchorElement | null): void;
