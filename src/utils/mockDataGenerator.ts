import { v4 as uuidv4 } from "uuid";
import { createCodeableConcept, createReference } from "./fhirUtils";

interface Patient {
  resourceType: "Patient";
  id: string;
  active: boolean;
  name: Array<{
    use: string;
    family: string;
    given: string[];
  }>;
  gender: string;
  birthDate: string;
  address: Array<{
    use: string;
    type: string;
    line: string[];
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
  telecom: Array<{
    system: string;
    value: string;
    use?: string;
  }>;
}

interface Condition {
  resourceType: "Condition";
  id: string;
  code: ReturnType<typeof createCodeableConcept>;
  subject: ReturnType<typeof createReference>;
  onsetDateTime: string;
  recordedDate: string;
  clinicalStatus: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  verificationStatus: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
}

interface MedicationStatement {
  resourceType: "MedicationStatement";
  id: string;
  status: string;
  medicationCodeableConcept: ReturnType<typeof createCodeableConcept>;
  subject: ReturnType<typeof createReference>;
  effectiveDateTime: string;
  dateAsserted: string;
  dosage: Array<{
    text: string;
    timing: {
      repeat: {
        frequency: number;
        period: number;
        periodUnit: string;
      };
    };
  }>;
}

interface AllergyIntolerance {
  resourceType: "AllergyIntolerance";
  id: string;
  clinicalStatus: ReturnType<typeof createCodeableConcept>;
  verificationStatus: ReturnType<typeof createCodeableConcept>;
  type: string;
  category: string[];
  criticality: string;
  code: ReturnType<typeof createCodeableConcept>;
  patient: ReturnType<typeof createReference>;
  onsetDateTime: string;
  recordedDate: string;
}

interface Observation {
  resourceType: "Observation";
  id: string;
  status: string;
  category: ReturnType<typeof createCodeableConcept>[];
  code: ReturnType<typeof createCodeableConcept>;
  subject: ReturnType<typeof createReference>;
  effectiveDateTime: string;
  issued: string;
  valueQuantity?: {
    value: number;
    unit: string;
    system: string;
    code: string;
  };
  component?: Array<{
    code: ReturnType<typeof createCodeableConcept>;
    valueQuantity: {
      value: number;
      unit: string;
      system: string;
      code: string;
    };
  }>;
}

interface DiagnosticReport {
  resourceType: "DiagnosticReport";
  id: string;
  status: string;
  category: ReturnType<typeof createCodeableConcept>;
  code: ReturnType<typeof createCodeableConcept>;
  subject: ReturnType<typeof createReference>;
  effectiveDateTime: string;
  issued: string;
  result: Array<ReturnType<typeof createReference>>;
  conclusion?: string;
}

interface Immunization {
  resourceType: "Immunization";
  id: string;
  status: string;
  vaccineCode: ReturnType<typeof createCodeableConcept>;
  patient: ReturnType<typeof createReference>;
  occurrenceDateTime: string;
  primarySource: boolean;
}

interface Appointment {
  resourceType: "Appointment";
  id: string;
  status: string;
  serviceType: ReturnType<typeof createCodeableConcept>[];
  reasonCode: ReturnType<typeof createCodeableConcept>[];
  start: string;
  end: string;
  participant: Array<{
    actor: ReturnType<typeof createReference>;
    status: string;
  }>;
}

interface Encounter {
  resourceType: "Encounter";
  id: string;
  status: string;
  class: {
    system: string;
    code: string;
    display: string;
  };
  type: ReturnType<typeof createCodeableConcept>[];
  subject: ReturnType<typeof createReference>;
  participant: Array<{
    type: ReturnType<typeof createCodeableConcept>[];
    individual: ReturnType<typeof createReference>;
  }>;
  period: {
    start: string;
    end?: string;
  };
}

interface Coverage {
  resourceType: "Coverage";
  id: string;
  status: string;
  type: ReturnType<typeof createCodeableConcept>;
  subscriber: ReturnType<typeof createReference>;
  beneficiary: ReturnType<typeof createReference>;
  relationship: ReturnType<typeof createCodeableConcept>;
  period: {
    start: string;
    end?: string;
  };
  payor: Array<ReturnType<typeof createReference>>;
}

const maleFirstNames = [
  "James",
  "Michael",
  "Robert",
  "John",
  "David",
  "William",
  "Richard",
  "Joseph",
  "Thomas",
  "Christopher",
  "Charles",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Andrew",
  "Paul",
  "Joshua",
  "Kenneth",
  "Kevin",
  "Brian",
  "Timothy",
  "Ronald",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Stephen",
  "Jonathan",
  "Frank",
  "Scott",
  "Justin",
  "Brandon",
  "Raymond",
  "Gregory",
  "Samuel",
  "Patrick",
  "Alexander",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Jose",
  "Adam",
  "Nathan",
];

const femaleFirstNames = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Margaret",
  "Dorothy",
  "Lisa",
  "Nancy",
  "Karen",
  "Betty",
  "Helen",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Emily",
  "Donna",
  "Michelle",
  "Carol",
  "Amanda",
  "Melissa",
  "Debra",
  "Stephanie",
  "Rebecca",
  "Laura",
  "Sharon",
  "Cynthia",
  "Kathleen",
  "Amy",
  "Angela",
  "Shirley",
  "Anna",
  "Ruth",
  "Brenda",
  "Pamela",
  "Nicole",
  "Christine",
  "Samantha",
  "Katherine",
  "Virginia",
  "Emma",
  "Rachel",
  "Marie",
  "Joyce",
  "Diana",
  "Julie",
  "Victoria",
  "Megan",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
];

const streetNames = [
  "Main St",
  "Oak Ave",
  "Maple Rd",
  "Cedar Ln",
  "Park Ave",
  "Elm St",
  "Washington St",
  "Lake St",
  "Hill St",
  "Pine St",
  "Spruce St",
  "Central Ave",
  "Broadway",
  "Church St",
  "Highland Ave",
  "Center St",
  "North St",
  "Union St",
  "South St",
  "River Rd",
  "Market St",
  "Court St",
  "Park St",
  "Liberty St",
  "Franklin St",
  "Walnut St",
  "Mill St",
  "Spring St",
  "School St",
  "High St",
];

export function generatePatient(): Patient {
  const genders = ["male", "female", "other", "unknown"];
  const gender = genders[Math.floor(Math.random() * genders.length)];

  let firstName: string;
  if (gender === "male") {
    firstName =
      maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
  } else if (gender === "female") {
    firstName =
      femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
  } else {
    firstName =
      Math.random() < 0.5
        ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
        : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
  }

  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    resourceType: "Patient",
    id: uuidv4(),
    active: true,
    name: [
      {
        use: "official",
        family: lastName,
        given: [firstName],
      },
    ],
    gender: gender,
    birthDate: generateRandomDate(1940, 2005),
    address: [generateAddress()],
    telecom: [
      {
        system: "phone",
        value: generatePhoneNumber(),
        use: "home",
      },
      {
        system: "email",
        value: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      },
    ],
  };
}

export function generateCondition(): Condition {
  const conditions = [
    { code: "I10", display: "Essential (primary) hypertension" },
    { code: "E11", display: "Type 2 diabetes mellitus" },
    { code: "J45", display: "Asthma" },
    { code: "E66", display: "Obesity" },
    { code: "F32", display: "Major depressive disorder, single episode" },
    { code: "M54.5", display: "Low back pain" },
    { code: "J30", display: "Allergic rhinitis" },
    { code: "K21", display: "Gastro-esophageal reflux disease" },
    { code: "I20", display: "Angina pectoris" },
    { code: "I25", display: "Chronic ischemic heart disease" },
    { code: "N18", display: "Chronic kidney disease" },
    { code: "F41.1", display: "Generalized anxiety disorder" },
    { code: "M17", display: "Osteoarthritis of knee" },
    { code: "G47.3", display: "Sleep apnea" },
    { code: "L20", display: "Atopic dermatitis" },
    { code: "R51", display: "Headache" },
    { code: "J20", display: "Acute bronchitis" },
    { code: "K50", display: "Crohn's disease" },
    { code: "K51", display: "Ulcerative colitis" },
    { code: "C34", display: "Lung cancer" },
    { code: "C50", display: "Breast cancer" },
    { code: "C61", display: "Prostate cancer" },
    { code: "C18", display: "Colon cancer" },
    { code: "C92", display: "Myeloid leukemia" },
    { code: "G40", display: "Epilepsy" },
    { code: "I50", display: "Heart failure" },
    { code: "I48", display: "Atrial fibrillation" },
    { code: "J44", display: "Chronic obstructive pulmonary disease" },
    { code: "K35", display: "Acute appendicitis" },
    { code: "K80", display: "Cholelithiasis" },
    { code: "L40", display: "Psoriasis" },
    { code: "M16", display: "Osteoarthritis of hip" },
    { code: "M81", display: "Osteoporosis" },
    { code: "N40", display: "Benign prostatic hyperplasia" },
    { code: "R73", display: "Elevated blood glucose level" },
    { code: "Z71.3", display: "Dietary counseling and surveillance" },
    { code: "Z79.4", display: "Long-term (current) use of insulin" },
    {
      code: "Z86.73",
      display:
        "Personal history of transient ischemic attack (TIA), and cerebral infarction without residual deficits",
    },
    { code: "Z87.891", display: "Personal history of nicotine dependence" },
    { code: "Z91.81", display: "History of falling" },
    { code: "Z93.3", display: "Colostomy status" },
    { code: "Z95.1", display: "Presence of aortocoronary bypass graft" },
    { code: "Z98.890", display: "Personal history of surgery" },
    { code: "Z99.2", display: "Dependence on renal dialysis" },
    { code: "R53.1", display: "Weakness" },
    { code: "R53.83", display: "Other fatigue" },
    { code: "R63.4", display: "Abnormal weight loss" },
    { code: "R64", display: "Cachexia" },
    { code: "R68.89", display: "Other general symptoms and signs" },
    { code: "R73.9", display: "Hyperglycemia, unspecified" },
  ];

  const condition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    resourceType: "Condition",
    id: uuidv4(),
    code: createCodeableConcept(
      condition.code,
      "http://hl7.org/fhir/sid/icd-10",
      condition.display
    ),
    subject: createReference("Patient", uuidv4()),
    onsetDateTime: generateRandomDate(2010, 2023),
    recordedDate: generateRandomDate(2010, 2023),
    clinicalStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: "active",
          display: "Active",
        },
      ],
    },
    verificationStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
          code: "confirmed",
          display: "Confirmed",
        },
      ],
    },
  };
}

export function generateMedicationStatement(): MedicationStatement {
  const medications = [
    { code: "315246", display: "Lisinopril 10 MG Oral Tablet" },
    { code: "314231", display: "Metformin 500 MG Oral Tablet" },
    { code: "315247", display: "Atorvastatin 20 MG Oral Tablet" },
    { code: "314232", display: "Amlodipine 5 MG Oral Tablet" },
    { code: "315248", display: "Metoprolol 50 MG Oral Tablet" },
    { code: "314233", display: "Omeprazole 20 MG Oral Capsule" },
    { code: "315249", display: "Simvastatin 40 MG Oral Tablet" },
    { code: "314234", display: "Losartan 50 MG Oral Tablet" },
    { code: "315250", display: "Gabapentin 300 MG Oral Capsule" },
    { code: "314235", display: "Hydrochlorothiazide 25 MG Oral Tablet" },
    { code: "315251", display: "Levothyroxine 50 MCG Oral Tablet" },
    { code: "314236", display: "Zolpidem 10 MG Oral Tablet" },
    { code: "315252", display: "Sertraline 50 MG Oral Tablet" },
    { code: "314237", display: "Furosemide 40 MG Oral Tablet" },
    { code: "315253", display: "Citalopram 20 MG Oral Tablet" },
    { code: "314238", display: "Alprazolam 0.5 MG Oral Tablet" },
    { code: "315254", display: "Fluoxetine 20 MG Oral Capsule" },
    { code: "314239", display: "Clopidogrel 75 MG Oral Tablet" },
    { code: "315255", display: "Prednisone 10 MG Oral Tablet" },
    { code: "314240", display: "Ibuprofen 200 MG Oral Tablet" },
    { code: "315256", display: "Tramadol 50 MG Oral Tablet" },
    { code: "314241", display: "Warfarin 5 MG Oral Tablet" },
    { code: "315257", display: "Oxycodone 5 MG Oral Tablet" },
    { code: "314242", display: "Ciprofloxacin 500 MG Oral Tablet" },
    { code: "315258", display: "Amoxicillin 500 MG Oral Capsule" },
    { code: "314243", display: "Azithromycin 250 MG Oral Tablet" },
    { code: "315259", display: "Pantoprazole 40 MG Oral Tablet" },
    { code: "314244", display: "Loratadine 10 MG Oral Tablet" },
    { code: "315260", display: "Montelukast 10 MG Oral Tablet" },
    { code: "314245", display: "Citalopram 10 MG Oral Tablet" },
    { code: "315261", display: "Bupropion 150 MG Oral Tablet" },
    { code: "314246", display: "Duloxetine 30 MG Oral Capsule" },
    { code: "315262", display: "Venlafaxine 75 MG Oral Tablet" },
    { code: "314247", display: "Trazodone 50 MG Oral Tablet" },
    { code: "315263", display: "Escitalopram 10 MG Oral Tablet" },
    { code: "314248", display: "Quetiapine 25 MG Oral Tablet" },
    { code: "315264", display: "Lorazepam 1 MG Oral Tablet" },
    { code: "314249", display: "Diazepam 5 MG Oral Tablet" },
    { code: "315265", display: "Hydrocodone 10 MG Oral Tablet" },
    { code: "314250", display: "Acetaminophen 500 MG Oral Tablet" },
    { code: "315266", display: "Naproxen 500 MG Oral Tablet" },
    { code: "314251", display: "Gabapentin 100 MG Oral Capsule" },
    { code: "315267", display: "Doxycycline 100 MG Oral Capsule" },
    { code: "314252", display: "Ranitidine 150 MG Oral Tablet" },
    { code: "315268", display: "Cetirizine 10 MG Oral Tablet" },
    { code: "314253", display: "Metformin 1000 MG Oral Tablet" },
    { code: "315269", display: "Rosuvastatin 10 MG Oral Tablet" },
    { code: "314254", display: "Simvastatin 20 MG Oral Tablet" },
    { code: "315270", display: "Albuterol 90 MCG/ACT Inhalation Aerosol" },
  ];

  const medication =
    medications[Math.floor(Math.random() * medications.length)];

  return {
    resourceType: "MedicationStatement",
    id: uuidv4(),
    status: "active",
    medicationCodeableConcept: createCodeableConcept(
      medication.code,
      "http://www.nlm.nih.gov/research/umls/rxnorm",
      medication.display
    ),
    subject: createReference("Patient", uuidv4()),
    effectiveDateTime: generateRandomDate(2020, 2023),
    dateAsserted: generateRandomDate(2020, 2023),
    dosage: [
      {
        text: "Once daily",
        timing: {
          repeat: {
            frequency: 1,
            period: 1,
            periodUnit: "d",
          },
        },
      },
    ],
  };
}

export function generateAllergyIntolerance(): AllergyIntolerance {
  const allergens = [
    { code: "91935009", display: "Allergy to peanuts" },
    { code: "91934008", display: "Allergy to milk" },
    { code: "91936006", display: "Allergy to eggs" },
    { code: "91937002", display: "Allergy to fish" },
    { code: "91938007", display: "Allergy to shellfish" },
    { code: "91939004", display: "Allergy to tree nuts" },
    { code: "91940001", display: "Allergy to wheat" },
    { code: "91941007", display: "Allergy to soybeans" },
    { code: "91942000", display: "Allergy to sesame" },
    { code: "91943005", display: "Allergy to latex" },
    { code: "91944004", display: "Allergy to pollen" },
    { code: "91945003", display: "Allergy to dust mites" },
    { code: "91946002", display: "Allergy to pet dander" },
    { code: "91947006", display: "Allergy to mold" },
    { code: "91948001", display: "Allergy to insect stings" },
    { code: "91949009", display: "Allergy to penicillin" },
    { code: "91950005", display: "Allergy to sulfa drugs" },
    { code: "91951009", display: "Allergy to aspirin" },
    { code: "91952002", display: "Allergy to ibuprofen" },
    { code: "91953007", display: "Allergy to nickel" },
    { code: "91954001", display: "Allergy to bee stings" },
    { code: "91955000", display: "Allergy to wasp stings" },
    { code: "91956004", display: "Allergy to soy" },
    { code: "91957008", display: "Allergy to gluten" },
    { code: "91958003", display: "Allergy to sulfites" },
    { code: "91959006", display: "Allergy to eggs" },
    { code: "91960009", display: "Allergy to corn" },
    { code: "91961008", display: "Allergy to strawberries" },
    { code: "91962001", display: "Allergy to tomatoes" },
    { code: "91963006", display: "Allergy to chocolate" },
    { code: "91964000", display: "Allergy to garlic" },
    { code: "91965004", display: "Allergy to bananas" },
    { code: "91966003", display: "Allergy to avocados" },
    { code: "91967007", display: "Allergy to kiwi" },
    { code: "91968002", display: "Allergy to chestnuts" },
    { code: "91969005", display: "Allergy to celery" },
    { code: "91970006", display: "Allergy to mustard" },
    { code: "91971005", display: "Allergy to sunflower seeds" },
    { code: "91972003", display: "Allergy to poppy seeds" },
    { code: "91973008", display: "Allergy to lupin" },
    { code: "91974002", display: "Allergy to lentils" },
    { code: "91975001", display: "Allergy to chickpeas" },
    { code: "91976000", display: "Allergy to peas" },
    { code: "91977004", display: "Allergy to beans" },
    { code: "91978009", display: "Allergy to pork" },
    { code: "91979001", display: "Allergy to beef" },
    { code: "91980004", display: "Allergy to chicken" },
    { code: "91981000", display: "Allergy to turkey" },
    { code: "91982007", display: "Allergy to lamb" },
    { code: "91983002", display: "Allergy to rabbit" },
  ];

  const allergen = allergens[Math.floor(Math.random() * allergens.length)];

  return {
    resourceType: "AllergyIntolerance",
    id: uuidv4(),
    clinicalStatus: createCodeableConcept(
      "active",
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
      "Active"
    ),
    verificationStatus: createCodeableConcept(
      "confirmed",
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
      "Confirmed"
    ),
    type: "allergy",
    category: ["food"],
    criticality: "high",
    code: createCodeableConcept(
      allergen.code,
      "http://snomed.info/sct",
      allergen.display
    ),
    patient: createReference("Patient", uuidv4()),
    onsetDateTime: generateRandomDate(2000, 2023),
    recordedDate: generateRandomDate(2000, 2023),
  };
}

export function generateObservation(): Observation {
  const observations = [
    {
      code: "8867-4",
      display: "Heart rate",
      unit: "beats/minute",
      min: 60,
      max: 100,
    },
    {
      code: "8310-5",
      display: "Body temperature",
      unit: "°C",
      min: 36.1,
      max: 37.2,
    },
    {
      code: "8480-6",
      display: "Systolic blood pressure",
      unit: "mm[Hg]",
      min: 90,
      max: 120,
    },
    {
      code: "8462-4",
      display: "Diastolic blood pressure",
      unit: "mm[Hg]",
      min: 60,
      max: 80,
    },
    {
      code: "2085-9",
      display: "Cholesterol in HDL",
      unit: "mg/dL",
      min: 40,
      max: 60,
    },
    {
      code: "2089-1",
      display: "Cholesterol in LDL",
      unit: "mg/dL",
      min: 0,
      max: 100,
    },
    {
      code: "55284-4",
      display: "Blood pressure",
      unit: "mm[Hg]",
      min: null,
      max: null,
    },
    {
      code: "29463-7",
      display: "Body weight",
      unit: "kg",
      min: null,
      max: null,
    },
    {
      code: "8302-2",
      display: "Body height",
      unit: "cm",
      min: null,
      max: null,
    },
    {
      code: "39156-5",
      display: "Body mass index",
      unit: "kg/m2",
      min: 18.5,
      max: 24.9,
    },
    {
      code: "14743-9",
      display: "Glucose [Moles/volume] in Blood",
      unit: "mmol/L",
      min: 3.9,
      max: 5.5,
    },
    {
      code: "15074-8",
      display: "Glucose [Mass/volume] in Blood",
      unit: "mg/dL",
      min: 70,
      max: 99,
    },
    {
      code: "4548-4",
      display: "Hemoglobin A1c/Hemoglobin.total in Blood",
      unit: "%",
      min: 4,
      max: 5.6,
    },
    {
      code: "1751-7",
      display: "Creatinine [Mass/volume] in Serum or Plasma",
      unit: "mg/dL",
      min: 0.6,
      max: 1.2,
    },
    {
      code: "2823-3",
      display: "Potassium [Moles/volume] in Serum or Plasma",
      unit: "mmol/L",
      min: 3.5,
      max: 5.0,
    },
    {
      code: "2824-1",
      display: "Sodium [Moles/volume] in Serum or Plasma",
      unit: "mmol/L",
      min: 135,
      max: 145,
    },
    {
      code: "20565-8",
      display: "Calcium [Moles/volume] in Serum or Plasma",
      unit: "mmol/L",
      min: 2.2,
      max: 2.6,
    },
    {
      code: "1759-0",
      display: "Bilirubin.total [Mass/volume] in Serum or Plasma",
      unit: "mg/dL",
      min: 0.1,
      max: 1.2,
    },
    {
      code: "1975-2",
      display: "Urea nitrogen [Mass/volume] in Serum or Plasma",
      unit: "mg/dL",
      min: 7,
      max: 20,
    },
    {
      code: "2345-7",
      display: "Glucose [Mass/volume] in Urine",
      unit: "mg/dL",
      min: 0,
      max: 15,
    },
  ];

  const observation =
    observations[Math.floor(Math.random() * observations.length)];

  let result: Observation = {
    resourceType: "Observation",
    id: uuidv4(),
    status: "final",
    category: [
      createCodeableConcept(
        "vital-signs",
        "http://terminology.hl7.org/CodeSystem/observation-category",
        "Vital Signs"
      ),
    ],
    code: createCodeableConcept(
      observation.code,
      "http://loinc.org",
      observation.display
    ),
    subject: createReference("Patient", uuidv4()),
    effectiveDateTime: generateRandomDate(2020, 2023),
    issued: new Date().toISOString(),
  };

  // Handle special cases
  switch (observation.code) {
    case "55284-4": // Blood pressure
      result.component = [
        {
          code: createCodeableConcept(
            "8480-6",
            "http://loinc.org",
            "Systolic blood pressure"
          ),
          valueQuantity: {
            value: Math.floor(Math.random() * (120 - 90 + 1)) + 90,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]",
          },
        },
        {
          code: createCodeableConcept(
            "8462-4",
            "http://loinc.org",
            "Diastolic blood pressure"
          ),
          valueQuantity: {
            value: Math.floor(Math.random() * (80 - 60 + 1)) + 60,
            unit: "mm[Hg]",
            system: "http://unitsofmeasure.org",
            code: "mm[Hg]",
          },
        },
      ];
      break;
    case "29463-7": // Body weight
      result.valueQuantity = {
        value: parseFloat((Math.random() * (120 - 40) + 40).toFixed(1)),
        unit: "kg",
        system: "http://unitsofmeasure.org",
        code: "kg",
      };
      break;
    case "8302-2": // Body height
      result.valueQuantity = {
        value: parseFloat((Math.random() * (200 - 150) + 150).toFixed(1)),
        unit: "cm",
        system: "http://unitsofmeasure.org",
        code: "cm",
      };
      break;
    default:
      if (observation.min !== null && observation.max !== null) {
        const value =
          Math.random() * (observation.max - observation.min) + observation.min;
        result.valueQuantity = {
          value: parseFloat(value.toFixed(1)),
          unit: observation.unit,
          system: "http://unitsofmeasure.org",
          code: observation.unit,
        };
      } else {
        // For any other cases where min and max are null,
        // you might want to handle them specifically or skip value assignment
        console.warn(
          `No specific handling for observation: ${observation.display}`
        );
      }
  }

  return result;
}

export function generateDiagnosticReport(): DiagnosticReport {
  const reports = [
    {
      code: "58410-2",
      display:
        "Complete blood count (hemogram) panel - Blood by Automated count",
    },
    {
      code: "30954-2",
      display: "Liver function panel - Serum or Plasma",
    },
    {
      code: "57021-8",
      display: "CBC W Auto Differential panel - Blood",
    },
    {
      code: "24323-8",
      display: "Basic Metabolic Panel - Serum or Plasma",
    },
    {
      code: "24331-1",
      display: "Comprehensive Metabolic Panel - Serum or Plasma",
    },
    {
      code: "2093-3",
      display: "Cholesterol measurement - Serum or Plasma",
    },
    {
      code: "2571-8",
      display: "Lipid panel - Serum or Plasma",
    },
    {
      code: "26453-1",
      display: "Thyroid function panel - Serum or Plasma",
    },
    {
      code: "45066-8",
      display: "Urinalysis complete with microscopy - Urine",
    },
    {
      code: "1975-2",
      display: "Creatinine measurement - Serum or Plasma",
    },
    {
      code: "2345-7",
      display: "Glucose measurement - Serum or Plasma",
    },
    {
      code: "4548-4",
      display: "Hemoglobin A1c measurement - Blood",
    },
    {
      code: "11579-0",
      display: "Hepatic function panel - Serum or Plasma",
    },
    {
      code: "24357-5",
      display: "Renal function panel - Serum or Plasma",
    },
    {
      code: "50398-7",
      display: "Prostate-specific antigen (PSA) measurement - Serum or Plasma",
    },
    {
      code: "26464-8",
      display: "Iron panel - Serum or Plasma",
    },
    {
      code: "2095-8",
      display: "HDL Cholesterol measurement - Serum or Plasma",
    },
    {
      code: "2089-1",
      display: "LDL Cholesterol measurement - Serum or Plasma",
    },
    {
      code: "2951-2",
      display: "Sodium measurement - Serum or Plasma",
    },
    {
      code: "2823-3",
      display: "Potassium measurement - Serum or Plasma",
    },
  ];

  const report = reports[Math.floor(Math.random() * reports.length)];

  return {
    resourceType: "DiagnosticReport",
    id: uuidv4(),
    status: "final",
    category: createCodeableConcept(
      "LAB",
      "http://terminology.hl7.org/CodeSystem/v2-0074",
      "Laboratory"
    ),
    code: createCodeableConcept(
      report.code,
      "http://loinc.org",
      report.display
    ),
    subject: createReference("Patient", uuidv4()),
    effectiveDateTime: generateRandomDate(2020, 2023),
    issued: new Date().toISOString(),
    result: [
      createReference("Observation", uuidv4()),
      createReference("Observation", uuidv4()),
    ],
    conclusion: "All results within normal range.",
  };
}

export function generateImmunization(): Immunization {
  const vaccines = [
    { code: "08", display: "Hepatitis B vaccine" },
    { code: "19", display: "BCG vaccine" },
    { code: "20", display: "DTaP vaccine" },
    { code: "10", display: "IPV vaccine" },
    { code: "21", display: "Varicella vaccine" },
    { code: "33", display: "Pneumococcal conjugate vaccine" },
    { code: "89", display: "Influenza vaccine" },
    { code: "03", display: "MMR vaccine" },
    { code: "52", display: "Hepatitis A vaccine" },
    { code: "114", display: "Meningococcal vaccine" },
    { code: "62", display: "HPV vaccine" },
    { code: "85", display: "Tdap vaccine" },
    { code: "83", display: "Zoster vaccine" },
    { code: "88", display: "Rotavirus vaccine" },
    { code: "115", display: "COVID-19 vaccine" },
    { code: "118", display: "Dengue vaccine" },
    { code: "39", display: "Japanese encephalitis vaccine" },
    { code: "91", display: "Rabies vaccine" },
    { code: "84", display: "Yellow fever vaccine" },
    { code: "86", display: "Typhoid vaccine" },
  ];

  const vaccine = vaccines[Math.floor(Math.random() * vaccines.length)];

  return {
    resourceType: "Immunization",
    id: uuidv4(),
    status: "completed",
    vaccineCode: createCodeableConcept(
      vaccine.code,
      "http://hl7.org/fhir/sid/cvx",
      vaccine.display
    ),
    patient: createReference("Patient", uuidv4()),
    occurrenceDateTime: generateRandomDate(2010, 2023),
    primarySource: true,
  };
}

export function generateAppointment(): Appointment {
  const appointmentTypes = [
    { code: "408443003", display: "General medical practice" },
    { code: "394701000", display: "Cardiology" },
    { code: "394584008", display: "Dermatology" },
    { code: "394586005", display: "Gastroenterology" },
    { code: "394591006", display: "Neurology" },
    { code: "394602003", display: "Oncology" },
    { code: "394611008", display: "Orthopedics" },
    { code: "394801008", display: "Pediatrics" },
    { code: "394814009", display: "Psychiatry" },
    { code: "394821004", display: "Radiology" },
    { code: "394848003", display: "Urology" },
    { code: "394582007", display: "Dentistry" },
    { code: "394593009", display: "Obstetrics and Gynecology" },
    { code: "394580004", display: "Chiropractic" },
    { code: "394600005", display: "Ophthalmology" },
    { code: "394605000", display: "Pathology" },
    { code: "394611008", display: "Pulmonology" },
    { code: "394801008", display: "Rheumatology" },
    { code: "394848003", display: "Surgery" },
    { code: "394582007", display: "Endocrinology" },
  ];

  const appointmentType =
    appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];

  return {
    resourceType: "Appointment",
    id: uuidv4(),
    status: "booked",
    serviceType: [
      createCodeableConcept(
        appointmentType.code,
        "http://snomed.info/sct",
        appointmentType.display
      ),
    ],
    reasonCode: [
      createCodeableConcept(
        "453701000124103",
        "http://snomed.info/sct",
        "Routine health maintenance"
      ),
    ],
    start: generateRandomDate(2023, 2024),
    end: generateRandomDate(2023, 2024),
    participant: [
      {
        actor: createReference("Patient", uuidv4()),
        status: "accepted",
      },
      {
        actor: createReference("Practitioner", uuidv4()),
        status: "accepted",
      },
    ],
  };
}

export function generateEncounter(): Encounter {
  const encounterTypes = [
    { code: "AMB", display: "ambulatory" },
    { code: "EMER", display: "emergency" },
    { code: "IMP", display: "inpatient encounter" },
    { code: "HH", display: "home health" },
    { code: "VIRT", display: "virtual" },
    { code: "OBS", display: "observation" },
    { code: "PRENC", display: "pre-admission" },
    { code: "POSTNC", display: "post-discharge" },
    { code: "WELL", display: "wellness visit" },
    { code: "CONS", display: "consultation" },
    { code: "TELE", display: "telemedicine" },
    { code: "SURG", display: "surgical day-care" },
    { code: "THER", display: "therapy session" },
    { code: "REHAB", display: "rehabilitation" },
    { code: "DIAG", display: "diagnostic" },
    { code: "MAT", display: "maternity" },
    { code: "PSYCH", display: "psychiatric" },
    { code: "DENT", display: "dental" },
    { code: "PHARM", display: "pharmacy" },
    { code: "NURS", display: "nursing" },
  ];

  const encounterType =
    encounterTypes[Math.floor(Math.random() * encounterTypes.length)];

  return {
    resourceType: "Encounter",
    id: uuidv4(),
    status: "finished",
    class: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: encounterType.code,
      display: encounterType.display,
    },
    type: [
      createCodeableConcept(
        "270427003",
        "http://snomed.info/sct",
        "Patient-initiated encounter"
      ),
    ],
    subject: createReference("Patient", uuidv4()),
    participant: [
      {
        type: [
          createCodeableConcept(
            "ATND",
            "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
            "attender"
          ),
        ],
        individual: createReference("Practitioner", uuidv4()),
      },
    ],
    period: {
      start: generateRandomDate(2020, 2023),
      end: generateRandomDate(2020, 2023),
    },
  };
}

export function generateCoverage(): Coverage {
  const coverageTypes = [
    { code: "EHCPOL", display: "extended healthcare" },
    { code: "PUBLICPOL", display: "public healthcare" },
    { code: "DENTPRG", display: "dental program" },
    { code: "MEDICARE", display: "Medicare" },
    { code: "MEDICAID", display: "Medicaid" },
    { code: "PRIVPOL", display: "private insurance" },
    { code: "TRICARE", display: "TRICARE" },
    { code: "VETBEN", display: "veteran benefits" },
    { code: "WORKCOMP", display: "workers' compensation" },
    { code: "AUTOINS", display: "automobile insurance" },
    { code: "TRAVELINS", display: "travel insurance" },
    { code: "LIFEINS", display: "life insurance" },
    { code: "DISABINS", display: "disability insurance" },
    { code: "LONGTERM", display: "long-term care insurance" },
    { code: "VISION", display: "vision care" },
    { code: "PHARMACY", display: "pharmacy benefits" },
    { code: "MENTALHLTH", display: "mental health coverage" },
    { code: "REHAB", display: "rehabilitation coverage" },
    { code: "HOSPICE", display: "hospice care" },
    { code: "MATERNITY", display: "maternity care" },
  ];

  const coverageType =
    coverageTypes[Math.floor(Math.random() * coverageTypes.length)];

  return {
    resourceType: "Coverage",
    id: uuidv4(),
    status: "active",
    type: createCodeableConcept(
      coverageType.code,
      "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      coverageType.display
    ),
    subscriber: createReference("Patient", uuidv4()),
    beneficiary: createReference("Patient", uuidv4()),
    relationship: createCodeableConcept(
      "self",
      "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
      "Self"
    ),
    period: {
      start: generateRandomDate(2020, 2023),
      end: generateRandomDate(2024, 2025),
    },
    payor: [createReference("Organization", uuidv4())],
  };
}

function generateRandomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split("T")[0];
}

function generateAddress() {
  const cities = [
    "Washington",
    "Franklin",
    "Clinton",
    "Arlington",
    "Centerville",
    "Georgetown",
    "Lebanon",
    "Springfield",
    "Fairview",
    "Salem",
    "Madison",
    "Chester",
    "Marion",
    "Greenville",
    "Bristol",
    "Dayton",
    "Milton",
    "Newport",
    "Troy",
    "Auburn",
    "Manchester",
    "Kingston",
    "Burlington",
    "Clayton",
    "Richmond",
    "Oxford",
    "Jackson",
    "Hamilton",
    "Plymouth",
    "Winchester",
    "Riverside",
    "Lakeside",
    "Ashland",
    "Milford",
    "Oakland",
    "Waverly",
    "Salem",
    "Marion",
    "Chester",
    "Greenville",
    "Arlington",
    "Manchester",
    "Springfield",
    "Milton",
    "Ashland",
    "Waverly",
    "Oakland",
    "Kingston",
    "Dayton",
    "Burlington",
  ];
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  return {
    use: "home",
    type: "physical",
    line: [
      `${Math.floor(Math.random() * 1000) + 1} ${
        streetNames[Math.floor(Math.random() * streetNames.length)]
      }`,
    ],
    city: cities[Math.floor(Math.random() * cities.length)],
    state: states[Math.floor(Math.random() * states.length)],
    postalCode: String(Math.floor(Math.random() * 90000) + 10000),
    country: "USA",
  };
}

function generatePhoneNumber(): string {
  return `(${Math.floor(Math.random() * 900) + 100}) ${
    Math.floor(Math.random() * 900) + 100
  }-${Math.floor(Math.random() * 9000) + 1000}`;
}
