"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads
   */
  function init() {

  }

  /**
   * a helper function to make returning an element based on id easier and faster
   * @param {string} idName - the id of the element to be located
   * @returns {Element} with id idName
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * a helper function to make creating an element easier and faster
   * @param {string} tagName - the name of the element to create
   * @returns {Element} of type tagName
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
