import { v4 as uuidv4 } from "uuid";

interface HttpResponse {
  statusCode: number;
  headers: {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Credentials": boolean;
  };
  body: string;
}

interface FhirBundle {
  resourceType: "Bundle";
  id: string;
  meta: {
    lastUpdated: string;
  };
  type: string;
  total: number;
  entry: Array<{
    fullUrl: string;
    resource: FhirResource;
  }>;
}

interface FhirResource {
  resourceType: string;
  id: string;
  [key: string]: any;
}

interface FhirReference {
  reference: string;
  display?: string;
}

interface FhirCodeableConcept {
  coding: Array<{
    system: string;
    code: string;
    display: string;
  }>;
  text: string;
}

/**
 * Builds a standardized HTTP response
 * @param statusCode - HTTP status code
 * @param body - Response body
 * @returns Formatted response object
 */
export function buildResponse(statusCode: number, body: any): HttpResponse {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/fhir+json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
}

/**
 * Generates a FHIR Bundle
 * @param type - Bundle type (e.g., 'searchset', 'transaction')
 * @param resources - Array of FHIR resources
 * @returns FHIR Bundle
 */
export function generateBundle(
  type: string,
  resources: FhirResource[]
): FhirBundle {
  return {
    resourceType: "Bundle",
    id: uuidv4(),
    meta: {
      lastUpdated: new Date().toISOString(),
    },
    type: type,
    total: resources.length,
    entry: resources.map((resource) => ({
      fullUrl: `urn:uuid:${resource.id}`,
      resource: resource,
    })),
  };
}

/**
 * Validates a FHIR resource
 * @param resource - FHIR resource to validate
 * @param expectedType - Expected resource type
 * @throws Error if validation fails
 */
export function validateResource(
  resource: FhirResource,
  expectedType: string
): void {
  if (!resource.resourceType) {
    throw new Error("Resource must have a resourceType");
  }
  if (resource.resourceType !== expectedType) {
    throw new Error(
      `Expected resourceType to be ${expectedType}, but got ${resource.resourceType}`
    );
  }
  if (!resource.id) {
    throw new Error("Resource must have an id");
  }
}

/**
 * Creates a FHIR Reference
 * @param resourceType - Type of the referenced resource
 * @param id - ID of the referenced resource
 * @param display - Optional display text
 * @returns FHIR Reference object
 */
export function createReference(
  resourceType: string,
  id: string,
  display?: string
): FhirReference {
  const reference: FhirReference = {
    reference: `${resourceType}/${id}`,
  };
  if (display) {
    reference.display = display;
  }
  return reference;
}

/**
 * Creates a FHIR CodeableConcept
 * @param code - The code
 * @param system - The coding system
 * @param display - The display text
 * @returns FHIR CodeableConcept object
 */
export function createCodeableConcept(
  code: string,
  system: string,
  display: string
): FhirCodeableConcept {
  return {
    coding: [
      {
        system: system,
        code: code,
        display: display,
      },
    ],
    text: display,
  };
}
