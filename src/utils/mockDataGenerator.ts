// src/utils/mockDataGenerator.ts

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
  interpretation?: ReturnType<typeof createCodeableConcept>[];
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
    { code: "M17", display: "Osteoarthritis of knee" },
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
    { code: "746281", display: "Albuterol 0.09 MG/ACTUAT Inhalant Solution" },
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
    { code: "418689008", display: "Allergy to grass pollen" },
    { code: "232350006", display: "Allergy to house dust mite" },
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
  ];

  const observation =
    observations[Math.floor(Math.random() * observations.length)];
  const value =
    Math.random() * (observation.max - observation.min) + observation.min;

  return {
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
    valueQuantity: {
      value: parseFloat(value.toFixed(1)),
      unit: observation.unit,
      system: "http://unitsofmeasure.org",
      code: observation.unit,
    },
  };
}

export function generateDiagnosticReport(): DiagnosticReport {
  const reports = [
    {
      code: "58410-2",
      display:
        "Complete blood count (hemogram) panel - Blood by Automated count",
    },
    { code: "30954-2", display: "Liver function panel - Serum or Plasma" },
    { code: "57021-8", display: "CBC W Auto Differential panel - Blood" },
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
  const cities = ["Springfield", "Riverside", "Fairview", "Lakeside"];
  const states = ["CA", "NY", "TX", "FL", "IL"];

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
