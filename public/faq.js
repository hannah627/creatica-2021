"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads
   */
  function init() {
    let buttons = qsa("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", revealAnswer);
    }
  }

  function revealAnswer(target) {
    let button = toggleAnswer(target);
    button.textContent = "/\\";
    button.removeEventListener("click", revealAnswer);
    button.addEventListener("click", hideAnswer);
  }

  function hideAnswer(target) {
    let button = toggleAnswer(target);
    button.textContent = "\\/";
    button.removeEventListener("click", hideAnswer);
    button.addEventListener("click", revealAnswer);
  }

  // function revealAnswer(target) {
  //   let questionBox = toggleAnswer(target);

  //   let hideButton = gen("button");
  //   hideButton.textContent = "/\\";
  //   questionBox.appendChild(hideButton);
  //   hideButton.addEventListener("click", hideAnswer);
  // }

  // function hideAnswer(target) {
  //   let questionBox = toggleAnswer(target);

  //   let revealButton = gen("button");
  //   revealButton.textContent = "\\/";
  //   questionBox.appendChild(revealButton);
  //   revealButton.addEventListener("click", revealAnswer);

  // }

  function toggleAnswer(target) {
    let button = target.target;
    let questionBox = button.parentNode.parentNode;
    let answer = questionBox.lastElementChild;
    answer.classList.toggle("hidden");
    return button;
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
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
    function qsa(selector) {
    return document.querySelectorAll(selector);
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
