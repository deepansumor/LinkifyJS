/**
 * Replaces the selected range with an anchor (<a>) element
 * using the provided name and href. Also applies custom attributes from config.
 * 
 * @param {Range} range - The selected text range to replace.
 * @param {string} name - The text content to display inside the anchor.
 * @param {string} href - The URL to set as the anchor's href.
 * @param {LinkifyConfig} config - Configuration object that may include
 *                                 additional attributes and a done callback.
 */
export function handleSelection(
    range: Range,
    name: string,
    href: string,
    config: LinkifyConfig
): void {
    // Create the anchor element
    const a = document.createElement('a');
    a.href = href;
    a.innerText = name;

    // Apply additional custom attributes from config
    for (const [key, value] of Object.entries(config.attributes || {})) {
        if (!['tooltip', 'label', 'input', 'submit', 'remove'].includes(key)) {
            a.setAttribute(key, value);
        }
    }

    // Replace the selected content with the anchor
    range.deleteContents();
    range.insertNode(a);

    // Call the done callback if provided
    if (typeof config.done === 'function') {
        config.done();
    }
}
