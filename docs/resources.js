/**
 * This is the client-side JavaScript for the resources page. It makes a fetch request to the
 * Mental Health Resource API in app.js whenever the search button is hit to find resources about
 * the state currently selected in the drop-down. It then formats the response from the API and adds
 * it to the page, and clears it whenever a new fetch request is made.
 */

"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * the function that runs when the page loads; adds an event listener to the search button so
   * the fetch request is made when it is clicked, and resets the drop-down menu to the default
   * (the first state alphabetically, Alabama)
   */
  function init() {
    id("search-btn").addEventListener("click", fetchResources);
    id("state").value = "Alabama";
  }

  /**
   * takes the currently selected state from the drop down and makes a fetch request to the Mental
   * Health Resource API with that state
   */
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
 * checks to ensure that data was fetched from the API successfully; if not, throws an error
 * @param {object} response - the response returned from the API call
 * @returns {object} response - the data returned from the API call
 */
    async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * takes the response from the Mental Health Resource API and formats accordingly (for example,
   * if there's a link in the response, that link is assigned to the first resource returned from
   * the API)
   * @param {JSON} response - the response from the API call
   */
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
   * a helper function to make creating an element easier and faster
   * @param {string} tagName - the name of the element to create
   * @returns {Element} of type tagName
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
