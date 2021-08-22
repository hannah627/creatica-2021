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
    "link": "https://namimass.org/resources/",
    "resources": "National Alliance on Mental Illness - Massachusetts; Phone: 617-704-6264; Email: compass@namimass.org; Emergency Services Program/Mobile Crisis Intervention: 1 (877) 382-1609"
  },
  {
    "state": "Michigan",
    "link": "https://namimi.org/",
    "resources": "National Alliance on Mental Illness - Michigan; Phone: 517-485-4049; Email: info@namimi.org"
  },
  {
    "state": "Minnesota",
    "link": "https://mentalhealthmn.org/support/community-resources/statewide-mental-health-resources/",
    "resources": "Mental Health Minnesota; Phone: 651-493-6634 or 800-862-1799; Email: info@mentalhealthmn.org"
  },
  {
    "state": "Mississippi",
    "link": "http://www.dmh.ms.gov/",
    "resources": "Mississippi Department of Mental Health; Toll Free Help Line: 1-877-210-8513"
  },
  {
    "state": "Missouri",
    "link": "https://dmh.mo.gov/behavioral-health",
    "resources": "Missouri Department of Mental Health; Phone: 573-751-4942; Email: dbhmail@dmh.mo.gov"
  },
  {
    "state": "Montana",
    "link": "http://mtdh.ruralinstitute.umt.edu/?page_id=721",
    "resources": "Montana Disability and Health Program; Phone: 406-243-4956; Email: meg.traci@mso.umt.edu"
  },
  {
    "state": "Nebraska",
    "link": "https://dhhs.ne.gov/Pages/Behavioral-Health.aspx",
    "resources": "Nebraska Department of Health and Human Services - Behavioral Health; Phone: 402-471-3121; Nebraska Family Helpline: 888-866-8660"
  },
  {
    "state": "Nevada",
    "link": "https://naminevada.org/crisis-info/",
    "resources": "National Alliance on Mental Illness - Nevada; Information Line: 775-470-5600; Email: info@naminevada.org; Nevada Helpline: 775-470-5600"
  },
  {
    "state": "New Hampshire",
    "link": "https://www.dhhs.nh.gov/dcbcs/bbh/index.htm",
    "resources": "New Hampshire Bureau of Mental Health Services"
  },
  {
    "state": "New Jersey",
    "link": "https://www.state.nj.us/humanservices/dmhas/home/hotlines/index.html",
    "resources": "New Jersey's DHS' Division of Mental Health Services; Phone: 800-382-6717; Email: dmhas.webhelp@dhs.nj.gov"
  },
  {
    "state": "New Mexico",
    "link": "https://www.newmexico.gov/stress/",
    "resources": "New Mexico Department of Behavioral Health; Phone: 1-855-NMCRISIS (662-7474); App: NMCONNECT"
  },
  {
    "state": "New York",
    "link": "https://my.omh.ny.gov/bi/pd/saw.dll?PortalPages",
    "resources": "New York Office of Mental Health; Phone: 1-800-597-8481; Crisis Text Line: Text Got5 to 741-741"
  },
  {
    "state": "North Carolina",
    "link": "https://www.ncdhhs.gov/divisions/mental-health-developmental-disabilities-and-substance-abuse/adult-mental-health-services",
    "resources": "North Carolina Adult Mental Health Services; Phone: 1-800-662-7030"
  },
  {
    "state": "North Dakota",
    "link": "https://www.nd.gov/dhs/services/mentalhealth/",
    "resources": "North Dakota Behavioral Health Services; Phone: (701) 328-8920"
  },
  {
    "state": "Ohio",
    "link": "https://namiohio.org/resources/",
    "resources": "National Alliance on Mental Illness - Ohio; Phone: 1-800-686-2646; Email: namiohio@namiohio.org"
  },
  {
    "state": "Oklahoma",
    "link": "https://mhaok.org/",
    "resources": "Mental Health Association Oklahoma; Phone: 918-585-1213 or 405-943-3700; Email: info@mhaok.org"
  },
  {
    "state": "Oregon",
    "link": "https://www.oregon.gov/oha/HSD/AMH/Pages/Get-Help.aspx",
    "resources": "Oregon Behavioral Health Services; Mental Health Crisis Line: 1-800-273-8255; Youthline: 1-877-968-8491"
  },
  {
    "state": "Pennsylvania",
    "link": "https://www.pa.gov/guides/mental-health/",
    "resources": "Pennsylvania.gov - Mental Health Resources; Crisis Text Line: Text PA to 741741; Support and Referral Helpline: 855-284-2494"
  },
  {
    "state": "Rhode Island",
    "link": "https://mhari.org/resources/",
    "resources": "Mental Health Association of Rhode Island"
  },
  {
    "state": "South Carolina",
    "link": "https://namisc.org/resources/",
    "resources": "National Alliance on Mental Illness - South Carolina; Phone: 800-788-5131; NAMI Helpline: 1-800-950-NAMI"
  },
  {
    "state": "South Dakota",
    "link": "https://namisouthdakota.org/",
    "resources": "National Alliance on Mental Illness - South Dakota; Phone: 605-271-1871"
  },
  {
    "state": "Tennessee",
    "link": "https://www.tn.gov/behavioral-health/mental-health-services.html",
    "resources": "Tennessee Department of Mental Health; Crisis Line: 855-274-7471; Helpline: 800-560-5767; Email: OCA.TDMHSAS@tn.gov"
  },
  {
    "state": "Texas",
    "link": "https://www.hhs.texas.gov/services/mental-health-substance-use",
    "resources": "Texas Health and Human Services; Crisis Text Line: Text TX to 741741"
  },
  {
    "state": "Utah",
    "link": "https://www.namiut.org/",
    "resources": "National Alliance on Mental Illness - Utah; UNI Crisis Line: 801-587-3000; Mentor Help Line: 801-323-9900"
  },
  {
    "state": "Vermont",
    "link": "https://mentalhealth.vermont.gov/services/emergency-services/how-get-help",
    "resources": "Vermont Department of Mental Health; Crisis Text Line: Text VT to 741741"
  },
  {
    "state": "Virginia",
    "link": "https://namivirginia.org/mental-health-resources/",
    "resources": "National Alliance on Mental Illness - Virginia; Help Line: 1-888-486-8264; Email: info@namivirginia.org"
  },
  {
    "state": "Washington",
    "link": "https://www.hca.wa.gov/health-care-services-supports/behavioral-health-recovery/mental-health-services",
    "resources": "Washington Health Care Authority - Mental Health Services; Washington Recovery Help Line: 1-866-789-1511"
  },
  {
    "state": "West Virginia",
    "link": "https://www.help4wv.com/resources",
    "resources": "Help4WV; Phone: (844) 435•7498; Email: (844) 435-7498"
  },
  {
    "state": "Wisconsin",
    "link": "http://www.mhawisconsin.org/statewide-resources-by-county.aspx",
    "resources": "Mental Health America - Wisconsin; Phone: (414) 276-3122; Email: info@mhawisconsin.org"
  },
  {
    "state": "Wyoming",
    "link": "https://health.wyo.gov/behavioralhealth/mhsa/treatment/cmhc/",
    "resources": "Wyoming Department of Health; Phone: 307-777-5817"
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
