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
    "link": "https://namialabama.org/",
    "resources": "National Alliance on Mental Illness - Alabama; Crisis Intervention: " +
      "1-800-273-8255; Crisis Text: 800-332-4224"
  },
  {
    "state": "Alaska",
    "link": "https://alaskabehavioralhealth.org/",
    "resources": "Alaska Behavioral Health; Crisis Intervention: 1-877-266-4357; Suicide " +
      "Prevention Hotline: 1-800-273-8255"
  },
  {
    "state": "Arizona",
    "link": "https://www.sbhservices.org/",
    "resources": "Southwest Behavioral and Health Services; Northern Crisis Intervention: (877) " +
      "756-4090; Central Crisis Intervention: (602) 222-9444; Southern SMI Determination: (855) " +
      "832-2866"
  },
  {
    "state": "Arkansas",
    "link": "https://namiarkansas.org/",
    "resources": "National Alliance on Mental Illness - Arkansas; Crisis Intervention: (800) " +
      "844-0381; Email: help@namiarkansas.org"
  },
  {
    "state": "California",
    "link": "https://up2riverside.org/resources/mental-health-ca-and-national-resources/",
    "resources": "It’s Up to Us; Crisis Intervention: (800) 499-3008; Suicide Prevention Hotline:" +
      " (800) 273-8255"
  },
  {
    "state": "Colorado",
    "link": "https://coloradocrisisservices.org/",
    "resources": "Colorado Crisis Services; Crisis Intervention: 1-844-493-8255;  Text: “TALK” " +
      "to 38255"
  },
  {
    "state": "Connecticut",
    "link": "https://www.awarerecoverycare.com/states-served/connecticut",
    "resources": "Aware Recovery Care; Crisis Intervention: 203-779-5799; In-Home Addiction " +
      "Treatment: 1-844-AWARERC"
  },
  {
    "state": "Delaware",
    "link": "https://www.delawareguidance.org/",
    "resources": "Delaware Guidance Services; Crisis Intervention: 1-800-969-HELP (4357); Email: " +
      "DGSinfo@delawareguidance.org"
  },
  {
    "state": "Florida",
    "link": "http://www.mhrcflorida.com/",
    "resources": "Mental Health Resource Center Florida; North Crisis Intervention: (904) " +
      "695-9145; South Crisis Intervention: (904) 642-9100"
  },
  {
    "state": "Georgia",
    "link": "https://www.mhageorgia.org/getting-help/",
    "resources": "Mental Health America - Georgia; Suicide Prevention Hotline: 1-800-273-TALK; " +
      "Alcohol and Drug Abuse Hotline: (800) 729-6686"
  },
  {
    "state": "Hawaii",
    "link": "https://health.hawaii.gov/amhd/consumer/access/#:~:text=Hawaii%20CARES%20provides%20a%20team,%2D800%2D753%2D6879",
    "resources": "Hawaii Department of Health - Adult Mental Health Division; Oahu Crisis " +
      "Intervention: 832-3100; Neighboring Islands Crisis Intervention: 1-800-753-6879"
  },
  {
    "state": "Idaho",
    "link": "https://healthandwelfare.idaho.gov/services-programs/behavioral-health",
    "resources": "Idaho Department of Health & Welfare; Crisis Intervention: 800-926-2588; " +
      "Suicide Prevention Hotline: 208-398-4357"
  },
  {
    "state": "Illinois",
    "link": "https://namiillinois.org/illinois-department-human-service-division-mental-health-community-based-programs-services/",
    "resources": "National Alliance for Mental Illness - Illinois; Crisis Intervention: " +
      "1-800-950-NAMI (6264); Text: “NAMI” to 741741"
  },
  {
    "state": "Indiana",
    "link": "https://bewellindiana.com/",
    "resources": "Be Well Indiana; Crisis Intervention: 211, Enter Your Zip Code and Press 3; " +
      "Suicide Prevention Hotline: (800) 273-TALK(8255)"
  },
  {
    "state": "Iowa",
    "link": "https://bewellindiana.com/",
    "resources": "Mind Spring Mental Health Alliance; Crisis Intervention: 1-855-581-8111; " +
      "Suicide Prevention Hotline: 1-800-273-TALK (8255)"
  },
  {
    "state": "Kansas",
    "link": "https://www.jocogov.org/dept/mental-health/home",
    "resources": "Johnson County Mental Health Center; Crisis Intervention: 913-268-0156; Email: " +
      "spc@jocogov.org"
  },
  {
    "state": "Kentucky",
    "link": "https://www.lifeskills.com/#",
    "resources": "LifeSkills Premium Healthcare Services; Crisis Intervention: 1-800-223-8913; " +
      "Suicide Prevention Hotline: 270-843-HELP (4357)"
  },
  {
    "state": "Louisiana",
    "link": "https://namilouisiana.org/",
    "resources": "National Alliance on Mental Illness - Louisiana; Crisis Intervention: " +
      "1-800-273-8255; Suicide Prevention Hotline: (800) SUICIDE"
  },
  {
    "state": "Maine",
    "link": "https://www.maine.gov/dhhs/obh/support-services/mental-health-services/recovery-support-services-treatment",
    "resources": "Maine Department of Health and Human Services; Crisis Intervention: " +
      "1-888-568-1112 (Voice); Domestic Violence Hotline: 1-866-834-HELP (4357)"
  },
  {
    "state": "Maryland",
    "link": "https://maryland.optum.com/content/ops-maryland/maryland/en/participants-families/crisis-resources.html",
    "resources": "Optum Maryland; Crisis Intervention: 1-800-422-0009; Baltimore Crisis " +
      "Intervention: 410-931-2214"
  },
  {
    "state": "Massachusetts",
    "link": "https://bewellindiana.com/",
    "resources": "none"
  },
  {
    "state": "Michigan",
    "resources": "none"
  },
  {
    "state": "Minnesota",
    "resources": "none"
  },
  {
    "state": "Mississippi",
    "resources": "none"
  },
  {
    "state": "Missouri",
    "resources": "none"
  },
  {
    "state": "Montana",
    "resources": "none"
  },
  {
    "state": "Nebraska",
    "resources": "none"
  },
  {
    "state": "Nevada",
    "resources": "none"
  },
  {
    "state": "New Hampshire",
    "resources": "none"
  },
  {
    "state": "New Jersey",
    "resources": "none"
  },
  {
    "state": "New Mexico",
    "resources": "none"
  },
  {
    "state": "New York",
    "resources": "none"
  },
  {
    "state": "North Carolina",
    "resources": "none"
  },
  {
    "state": "North Dakota",
    "resources": "none"
  },
  {
    "state": "Ohio",
    "resources": "none"
  },
  {
    "state": "Oklahoma",
    "resources": "none"
  },
  {
    "state": "Oregon",
    "resources": "none"
  },
  {
    "state": "Pennsylvania",
    "resources": "none"
  },
  {
    "state": "Rhode Island",
    "resources": "none"
  },
  {
    "state": "South Carolina",
    "resources": "none"
  },
  {
    "state": "South Dakota",
    "resources": "none"
  },
  {
    "state": "Tennessee",
    "resources": "none"
  },
  {
    "state": "Texas",
    "resources": "none"
  },
  {
    "state": "Utah",
    "resources": "none"
  },
  {
    "state": "Vermont",
    "resources": "none"
  },
  {
    "state": "Virginia",
    "resources": "none"
  },
  {
    "state": "Washington",
    "resources": "none"
  },
  {
    "state": "West Virginia",
    "resources": "none"
  },
  {
    "state": "Wisconsin",
    "resources": "none"
  },
  {
    "state": "Wyoming",
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
