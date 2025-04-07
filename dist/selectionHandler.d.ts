/**
 * Replaces the selected range with an anchor (<a>) element
 * using the provided name and href. Also applies custom attributes from config.
 *
 * @param {Range} range - The selected text range to replace.
 * @param {string} name - The text content to display inside the anchor.
 * @param {string} href - The URL to set as the anchor's href.
 * @param {LinkifyConfig} config - Optional configuration object that may include
 *                                 additional attributes (excluding reserved ones).
 */
export declare function handleSelection(range: Range, name: string, href: string, config: LinkifyConfig): void;
