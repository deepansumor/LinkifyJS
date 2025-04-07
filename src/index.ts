/**
 * LinkifyJS - A JavaScript library for handling inline text linking via tooltip UI.
 * Provides a clean interface to transform selected text into a clickable anchor tag with a custom tooltip.
 * 
 * @author Deepansu Mor
 * @github https://github.com/deepansumor
 */

import { initTooltip } from './tooltip'; 

/**
 * LinkifyJS class provides a static method to initialize the selection linking behavior
 */
export default class LinkifyJS {

    /**
     * Initializes the LinkifyJS behavior on a given container element.
     * 
     * @param {HTMLElement} container - The container to attach selection behavior to.
     * @param {LinkifyConfig} config - Optional configuration object for tooltip styling, text, placeholders, etc.
     */
    static init(container: HTMLElement, config: LinkifyConfig = {}) {
        container.addEventListener('mouseup', (e) => {
            const selection = window.getSelection();
            const selectedText = selection?.toString();
            let lastSelectionRange: Range | null;

            // Save the current selection range if there's a valid text selection
            if (selection && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                lastSelectionRange = range.cloneRange();
            } else {
                lastSelectionRange = null;
            }

            // Proceed only if some text is selected and container contains it
            if (selectedText && selectedText.trim() !== '') {
                const range = selection?.getRangeAt(0);

                if (range && selection && container.contains(selection.anchorNode)) {
                    let existingLink: HTMLAnchorElement | null = null;

                    // Traverse up from the anchor node to check if selection is inside an <a> tag
                    if (selection?.anchorNode) {
                        let node: Node | null = selection.anchorNode;
                        while (node && node !== container) {
                            if (node.nodeType === 1 && (node as HTMLElement).tagName === 'A') {
                                existingLink = node as HTMLAnchorElement;
                                break;
                            }
                            node = node.parentNode;
                        }
                    }

                    // Initialize the tooltip with selected range, mouse position, and existing link if any
                    initTooltip(
                        lastSelectionRange,
                        selectedText,
                        config,
                        { x: e.clientX, y: e.clientY },
                        existingLink
                    );
                }
            }
        });
    }
}
