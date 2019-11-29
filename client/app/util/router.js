/**
 * DOM-based routing calls a function if the document contains the elements that match the selector
 *
 * @param {String} selector A string containing a selector expression
 * @param {Function} callback A function to be invoked
 */
export default function route(selector, callback) {
    const elements = document.querySelectorAll(selector);
    if (elements.length) {
        callback();
    }
}
