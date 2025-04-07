var LinkifyJS;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/selectionHandler.ts":
/*!*********************************!*\
  !*** ./src/selectionHandler.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleSelection: () => (/* binding */ handleSelection)
/* harmony export */ });
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
function handleSelection(range, name, href, config) {
    // Create the anchor element
    const a = document.createElement('a');
    a.href = href;
    a.innerText = name;
    // Apply additional custom attributes from config
    for (const [key, value] of Object.entries(config)) {
        // Only apply if key is not one of the known reserved keys
        if (!['tooltip', 'label', 'input', 'submit', 'remove'].includes(key)) {
            a.setAttribute(key, value);
        }
    }
    // Replace the selected content with the anchor
    range.deleteContents();
    range.insertNode(a);
}


/***/ }),

/***/ "./src/tooltip.ts":
/*!************************!*\
  !*** ./src/tooltip.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTooltip: () => (/* binding */ initTooltip)
/* harmony export */ });
/* harmony import */ var _selectionHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectionHandler */ "./src/selectionHandler.ts");
/**
 * Tooltip Module for LinkifyJS
 * Dynamically renders a tooltip to allow users to link selected text with custom display text and URL.
 * Supports optional removal of existing links and customizable styles and class names.
 */

// Default styling for tooltip container
const tooltipStyles = {
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
const inputStyles = {
    padding: '6px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
};
// Default styling for the submit button
const submitButtonStyles = {
    padding: '6px 10px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
// Default styling for the remove button
const removeButtonStyles = {
    padding: '6px 10px',
    background: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
// Label styling
const labelStyles = {
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
function initTooltip(range, selectedText, config = {}, position, existingLink) {
    const { labelText = 'Text', labelURL = 'URL', placeholderText = 'Text', placeholderURL = 'URL', classNames = {}, styles = {}, } = config;
    if (!range)
        return;
    // Remove existing tooltip if one is already open
    const existingTooltip = document.querySelector('.linkify-tooltip');
    if (existingTooltip)
        existingTooltip.remove();
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
    nameInput.value = (existingLink === null || existingLink === void 0 ? void 0 : existingLink.innerText) || selectedText;
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
    urlInput.value = (existingLink === null || existingLink === void 0 ? void 0 : existingLink.href) || '';
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
            (0,_selectionHandler__WEBPACK_IMPORTED_MODULE_0__.handleSelection)(range, name, href, config);
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
            var _a;
            const textNode = document.createTextNode(existingLink.innerText);
            (_a = existingLink.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(textNode, existingLink);
            tooltip.remove();
        };
        Object.assign(removeBtn.style, removeButtonStyles, styles.remove);
        tooltip.appendChild(removeBtn);
    }
    // Attach tooltip to the DOM early to get dimensions
    document.body.appendChild(tooltip);
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
    if (left < 8)
        left = 8;
    if (top < 8)
        top = 8;
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkifyJS)
/* harmony export */ });
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip */ "./src/tooltip.ts");
/**
 * LinkifyJS - A JavaScript library for handling inline text linking via tooltip UI.
 * Provides a clean interface to transform selected text into a clickable anchor tag with a custom tooltip.
 *
 * @author Deepansu Mor
 * @github https://github.com/deepansumor
 */

/**
 * LinkifyJS class provides a static method to initialize the selection linking behavior
 */
class LinkifyJS {
    /**
     * Initializes the LinkifyJS behavior on a given container element.
     *
     * @param {HTMLElement} container - The container to attach selection behavior to.
     * @param {LinkifyConfig} config - Optional configuration object for tooltip styling, text, placeholders, etc.
     */
    static init(container, config = {}) {
        container.addEventListener('mouseup', (e) => {
            const selection = window.getSelection();
            const selectedText = selection === null || selection === void 0 ? void 0 : selection.toString();
            let lastSelectionRange;
            // Save the current selection range if there's a valid text selection
            if (selection && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                lastSelectionRange = range.cloneRange();
            }
            else {
                lastSelectionRange = null;
            }
            // Proceed only if some text is selected and container contains it
            if (selectedText && selectedText.trim() !== '') {
                const range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
                if (range && selection && container.contains(selection.anchorNode)) {
                    let existingLink = null;
                    // Traverse up from the anchor node to check if selection is inside an <a> tag
                    if (selection === null || selection === void 0 ? void 0 : selection.anchorNode) {
                        let node = selection.anchorNode;
                        while (node && node !== container) {
                            if (node.nodeType === 1 && node.tagName === 'A') {
                                existingLink = node;
                                break;
                            }
                            node = node.parentNode;
                        }
                    }
                    // Initialize the tooltip with selected range, mouse position, and existing link if any
                    (0,_tooltip__WEBPACK_IMPORTED_MODULE_0__.initTooltip)(lastSelectionRange, selectedText, config, { x: e.clientX, y: e.clientY }, existingLink);
                }
            }
        });
    }
}

})();

LinkifyJS = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=linkify.js.map