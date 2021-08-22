/**
 * This is the client-side JavaScript for the frequently asked questions page. It reveals the answer
 * to a given question when the corresponding drop-down arrow is clicked, and changes the button so
 * that when it's clicked again, it hides the answer instead.
 */

"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads; finds all the buttons on the page, and sets them
   * to reveal the answer to their corresponding question when clicked
   */
  function init() {
    let buttons = qsa("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", revealAnswer);
    }
  }

  /**
   * reveals the answer to a given question, and changes the button to hide the answer when clicked
   * instead of reveal it
   * @param {Event} action - the event that called this function (in this case, clicking the button)
   */
  function revealAnswer(action) {
    let button = toggleAnswer(action);
    button.textContent = "/\\";
    button.removeEventListener("click", revealAnswer);
    button.addEventListener("click", hideAnswer);
  }

    /**
   * hides the answer to a given question, and changes the button to reveal the answer when clicked
   * instead of hide it
   * @param {Event} action - the event that called this function (in this case, clicking the button)
   */
  function hideAnswer(action) {
    let button = toggleAnswer(action);
    button.textContent = "\\/";
    button.removeEventListener("click", hideAnswer);
    button.addEventListener("click", revealAnswer);
  }

  /**
   * finds the button that was clicked and toggles the appropriate classes to make the answer
   * visible or hidden
   * @param {Event} action - the event that called the previous function (in this case, clicking
   * the button)
   * @returns {DOM element} button - the button that was clicked
   */
  function toggleAnswer(action) {
    let button = action.target;
    let questionBox = button.parentNode.parentNode;
    let answer = questionBox.lastElementChild;
    answer.classList.toggle("hidden");
    answer.classList.toggle("question-answer");
    return button;
  }

  /**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
    function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
