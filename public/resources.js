"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads
   */
  function init() {
    id("search-btn").addEventListener("click", fetchResources);
    id("state").value = "Alabama";
  }

  function fetchResources() {
    id("search-results").innerHTML = "";
    state = id("state").value;
    fetch("/resources/" + state)
    .then(statusCheck)
    .then(res => res.json())
    .then(processResources)
    .catch(handleError);
  }

  /**
 * Checks to ensure that data was fetched from the API successfully; if not, throws an error
 * @param {object} response - the response returned from the API call
 * @returns {object} response - the data returned from the API call
 */
    async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  function processResources(response) {
    let resources = response.resources;
    let resourcesArray = resources.split("; ");
    let link = "";
    for (let i = 0; i < resourcesArray.length; i++) {
      let text = gen("p");
      if (response.link && i === 0) {
        link = response.link;
        let linkedText = gen("a");
        linkedText.href = link;
        linkedText.textContent = resourcesArray[i];
        text.appendChild(linkedText);
      } else {
        text.textContent = resourcesArray[i];
      }
      id("search-results").appendChild(text);
    }
  }

  /**
 * a function to deal with any errors that may occur when trying to fetch data from the API.
 * Adds a message to the page informing the user that an error occured, what type the error was,
 * and then suggesting that the user refresh the page or try again later.
 * @param {string} err - the error that occured when trying to fetch data from the API
 */
    function handleError(err) {
    let errorMessage = gen("h3");
    errorMessage.textContent = "An error occured of type: " + err + ". Try refreshing the page or" +
      " trying again later.";
    id("search-results").appendChild(errorMessage);
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
