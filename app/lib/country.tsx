// --- 1. COMPLETE ISO 3166-1 COUNTRY NAMES MAPPING ---

/**
 * Complete mapping of M49 numeric codes to country/region names
 * Based on UN M49 Standard
 */
export const COUNTRY_NAMES_BY_M49: Record<string, string> = {
  // World and Major Regions
 
  "002": "Africa",
  "019": "Americas",
  "142": "Asia",
  "150": "Europe",
  "009": "Oceania",
  "010": "Antarctica",
  
  // Africa Subregions
  "015": "Northern Africa",
  "202": "Sub-Saharan Africa",
  "014": "Eastern Africa",
  "017": "Middle Africa",
  "018": "Southern Africa",
  "011": "Western Africa",
  
  // Americas Subregions
  "419": "Latin America and the Caribbean",
  "029": "Caribbean",
  "013": "Central America",
  "005": "South America",
  "021": "Northern America",
  
  // Asia Subregions
  "143": "Central Asia",
  "030": "Eastern Asia",
  "035": "South-Eastern Asia",
  "034": "Southern Asia",
  "145": "Western Asia",
  
  // Europe Subregions
  "151": "Eastern Europe",
  "154": "Northern Europe",
  "039": "Southern Europe",
  "155": "Western Europe",
  
  // Oceania Subregions
  "053": "Australia and New Zealand",
  "054": "Melanesia",
  "057": "Micronesia",
  "061": "Polynesia",
  
  // Special Groupings
  "432": "Landlocked Developing Countries (LLDC)",
  "199": "Least Developed Countries (LDC)",
  "722": "Small Island Developing States (SIDS)",
  
  // African Countries
  "012": "Algeria",
  "818": "Egypt",
  "434": "Libya",
  "504": "Morocco",
  "729": "Sudan",
  "788": "Tunisia",
  "732": "Western Sahara",
  "086": "British Indian Ocean Territory",
  "108": "Burundi",
  "174": "Comoros",
  "262": "Djibouti",
  "232": "Eritrea",
  "231": "Ethiopia",
  "260": "French Southern Territories",
  "404": "Kenya",
  "450": "Madagascar",
  "454": "Malawi",
  "480": "Mauritius",
  "175": "Mayotte",
  "508": "Mozambique",
  "638": "Réunion",
  "646": "Rwanda",
  "690": "Seychelles",
  "706": "Somalia",
  "728": "South Sudan",
  "800": "Uganda",
  "834": "United Republic of Tanzania",
  "894": "Zambia",
  "716": "Zimbabwe",
  "024": "Angola",
  "120": "Cameroon",
  "140": "Central African Republic",
  "148": "Chad",
  "178": "Congo",
  "180": "Democratic Republic of the Congo",
  "226": "Equatorial Guinea",
  "266": "Gabon",
  "678": "Sao Tome and Principe",
  "072": "Botswana",
  "748": "Eswatini",
  "426": "Lesotho",
  "516": "Namibia",
  "710": "South Africa",
  "204": "Benin",
  "854": "Burkina Faso",
  "132": "Cabo Verde",
  "384": "Côte d'Ivoire",
  "270": "Gambia",
  "288": "Ghana",
  "324": "Guinea",
  "624": "Guinea-Bissau",
  "430": "Liberia",
  "466": "Mali",
  "478": "Mauritania",
  "562": "Niger",
  "566": "Nigeria",
  "654": "Saint Helena",
  "686": "Senegal",
  "694": "Sierra Leone",
  "768": "Togo",
  
  // Americas Countries
  "660": "Anguilla",
  "028": "Antigua and Barbuda",
  "533": "Aruba",
  "044": "Bahamas",
  "052": "Barbados",
  "535": "Bonaire, Sint Eustatius and Saba",
  "092": "British Virgin Islands",
  "136": "Cayman Islands",
  "192": "Cuba",
  "531": "Curaçao",
  "212": "Dominica",
  "214": "Dominican Republic",
  "308": "Grenada",
  "312": "Guadeloupe",
  "332": "Haiti",
  "388": "Jamaica",
  "474": "Martinique",
  "500": "Montserrat",
  "630": "Puerto Rico",
  "652": "Saint Barthélemy",
  "659": "Saint Kitts and Nevis",
  "662": "Saint Lucia",
  "663": "Saint Martin (French Part)",
  "670": "Saint Vincent and the Grenadines",
  "534": "Sint Maarten (Dutch part)",
  "780": "Trinidad and Tobago",
  "796": "Turks and Caicos Islands",
  "850": "United States Virgin Islands",
  "084": "Belize",
  "188": "Costa Rica",
  "222": "El Salvador",
  "320": "Guatemala",
  "340": "Honduras",
  "484": "Mexico",
  "558": "Nicaragua",
  "591": "Panama",
  "032": "Argentina",
  "068": "Bolivia (Plurinational State of)",
  "074": "Bouvet Island",
  "076": "Brazil",
  "152": "Chile",
  "170": "Colombia",
  "218": "Ecuador",
  "238": "Falkland Islands (Malvinas)",
  "254": "French Guiana",
  "328": "Guyana",
  "600": "Paraguay",
  "604": "Peru",
  "239": "South Georgia and the South Sandwich Islands",
  "740": "Suriname",
  "858": "Uruguay",
  "862": "Venezuela (Bolivarian Republic of)",
  "060": "Bermuda",
  "124": "Canada",
  "304": "Greenland",
  "666": "Saint Pierre and Miquelon",
  "840": "United States of America",
  
  // Asian Countries
  "398": "Kazakhstan",
  "417": "Kyrgyzstan",
  "762": "Tajikistan",
  "795": "Turkmenistan",
  "860": "Uzbekistan",
  "156": "China",
  "344": "China, Hong Kong Special Administrative Region",
  "446": "China, Macao Special Administrative Region",
  "408": "Democratic People's Republic of Korea",
  "392": "Japan",
  "496": "Mongolia",
  "410": "Republic of Korea",
  "096": "Brunei Darussalam",
  "116": "Cambodia",
  "360": "Indonesia",
  "418": "Lao People's Democratic Republic",
  "458": "Malaysia",
  "104": "Myanmar",
  "608": "Philippines",
  "702": "Singapore",
  "764": "Thailand",
  "626": "Timor-Leste",
  "704": "Viet Nam",
  "004": "Afghanistan",
  "050": "Bangladesh",
  "064": "Bhutan",
  "356": "India",
  "364": "Iran (Islamic Republic of)",
  "462": "Maldives",
  "524": "Nepal",
  "586": "Pakistan",
  "144": "Sri Lanka",
  "051": "Armenia",
  "031": "Azerbaijan",
  "048": "Bahrain",
  "196": "Cyprus",
  "268": "Georgia",
  "368": "Iraq",
  "376": "Israel",
  "400": "Jordan",
  "414": "Kuwait",
  "422": "Lebanon",
  "512": "Oman",
  "634": "Qatar",
  "682": "Saudi Arabia",
  "275": "State of Palestine",
  "760": "Syrian Arab Republic",
  "792": "Türkiye",
  "784": "United Arab Emirates",
  "887": "Yemen",
  
  // European Countries
  "112": "Belarus",
  "100": "Bulgaria",
  "203": "Czechia",
  "348": "Hungary",
  "616": "Poland",
  "498": "Republic of Moldova",
  "642": "Romania",
  "643": "Russian Federation",
  "703": "Slovakia",
  "804": "Ukraine",
  "248": "Åland Islands",
  "208": "Denmark",
  "233": "Estonia",
  "234": "Faroe Islands",
  "246": "Finland",
  "831": "Guernsey",
  "352": "Iceland",
  "372": "Ireland",
  "833": "Isle of Man",
  "832": "Jersey",
  "428": "Latvia",
  "440": "Lithuania",
  "578": "Norway",
  "744": "Svalbard and Jan Mayen Islands",
  "752": "Sweden",
  "826": "United Kingdom of Great Britain and Northern Ireland",
  "008": "Albania",
  "020": "Andorra",
  "070": "Bosnia and Herzegovina",
  "191": "Croatia",
  "292": "Gibraltar",
  "300": "Greece",
  "336": "Holy See",
  "380": "Italy",
  "470": "Malta",
  "499": "Montenegro",
  "807": "North Macedonia",
  "620": "Portugal",
  "674": "San Marino",
  "688": "Serbia",
  "705": "Slovenia",
  "724": "Spain",
  "040": "Austria",
  "056": "Belgium",
  "250": "France",
  "276": "Germany",
  "438": "Liechtenstein",
  "442": "Luxembourg",
  "492": "Monaco",
  "528": "Netherlands (Kingdom of the)",
  "756": "Switzerland",
  
  // Oceania Countries
  "036": "Australia",
  "162": "Christmas Island",
  "166": "Cocos (Keeling) Islands",
  "334": "Heard Island and McDonald Islands",
  "554": "New Zealand",
  "574": "Norfolk Island",
  "242": "Fiji",
  "540": "New Caledonia",
  "598": "Papua New Guinea",
  "090": "Solomon Islands",
  "548": "Vanuatu",
  "316": "Guam",
  "296": "Kiribati",
  "584": "Marshall Islands",
  "583": "Micronesia (Federated States of)",
  "520": "Nauru",
  "580": "Northern Mariana Islands",
  "585": "Palau",
  "581": "United States Minor Outlying Islands",
  "016": "American Samoa",
  "184": "Cook Islands",
  "258": "French Polynesia",
  "570": "Niue",
  "612": "Pitcairn",
  "882": "Samoa",
  "772": "Tokelau",
  "776": "Tonga",
  "798": "Tuvalu",
  "876": "Wallis and Futuna Islands",
};

// --- 2. DEPRECATED GS1 REGION MAP ---

export const DEPRECATED_REGION_MAP: { 
  alpha2: string | null; 
  numeric: string | null; 
  description: string; 
  m49: string; 
}[] = [
  { alpha2: null, numeric: "900", description: "European Union", m49: "097" },
  { alpha2: "XB", numeric: "901", description: "North American Region", m49: "021" },
  { alpha2: "XC", numeric: "902", description: "Central American Region", m49: "013" },
  { alpha2: "XG", numeric: "906", description: "North African Region", m49: "015" },
  { alpha2: "XH", numeric: "907", description: "Middle Eastern Region", m49: "145" },
  { alpha2: "XJ", numeric: "908", description: "Asia Region", m49: "142" },
  { alpha2: "XL", numeric: "909", description: "Pacific Region", m49: "009" },
  { alpha2: "WW", numeric: "910", description: "Whole World", m49: "001" },
];

export function getM49RegionInfo(code: string | null): typeof DEPRECATED_REGION_MAP[0] | undefined {
    if (!code) return undefined;
    const upperCode = code.toUpperCase();
    
    return DEPRECATED_REGION_MAP.find(
        item => item.alpha2 === upperCode || item.numeric === upperCode
    );
}

// --- 3. COUNTRY CODE INTERFACE ---

export interface CountryCodeEntry {
    numeric: string;
    alpha2: string;
    alpha3: string;
    description?: string;
}

// --- 4. ENHANCED FORMATTING UTILITY ---

/**
 * Formats a CountryCodeEntry object into a complete country/region name.
 * @param entry The CountryCodeEntry object from the API response.
 * @returns Complete country or region name.
 */
export function formatCountryCode(entry: CountryCodeEntry): string {
    const { numeric } = entry;

    // First check direct M49 mapping (includes all countries and regions)
    if (numeric && COUNTRY_NAMES_BY_M49[numeric]) {
        return COUNTRY_NAMES_BY_M49[numeric];
    }

    // Check deprecated GS1 codes
    const m49Info = DEPRECATED_REGION_MAP.find(item => item.m49 === numeric);
    if (m49Info) {
        return m49Info.description;
    }

    // Fallback
    return entry.alpha2 || entry.alpha3 || numeric || 'Unknown Country';
}