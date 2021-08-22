/**
 *
 */

'use strict';
const express = require('express');
const app = express();

const INVALID_PARAM_ERROR = 400;
const INVALID_PARAM_MESSAGE = "Invalid state name. Try using the name of one of the 50 US states," +
  " with the first letter capitalized, i.e. \"Alabama\"";

let resourcesList = [
  {
    "state": "Alabama",
    "resources": "resource1; resource2; resource3"
  },
  {
    "state": "Alaska",
    "resources": "resource1; resource2; resource3",
  },
  {
    "state": "Arizona",
    "resources": "none"
  }

];

/**
*
*/
app.get("/resources/:state", (req, res) => {
  let state = req.params["state"];
  let resources = {};
  for(let i = 0; i < resourcesList.length; i++) {
    let currentState = resourcesList[i].state;
    if (currentState === state) {
      resources = resourcesList[i];
    }
  }
  if (resources.length === 0) {
    res.type("text")
    res.status(INVALID_PARAM_ERROR).send(INVALID_PARAM_MESSAGE);
  } else { // resources.length !== 0
    res.json(resources);
  }
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
