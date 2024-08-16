import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const patientId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (patientId) {
        return getPatient(patientId);
      } else {
        return getPatients();
      }
    case "POST":
      return createPatient(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getPatient(id: string): APIGatewayProxyResult {
  // In a real implementation, this would fetch from a database
  const patient = mockDataGenerator.generatePatient();
  patient.id = id;
  return fhirUtils.buildResponse(200, patient);
}

function getPatients(): APIGatewayProxyResult {
  // In a real implementation, this would fetch from a database with pagination
  const patients = Array.from({ length: 10 }, () =>
    mockDataGenerator.generatePatient()
  );
  const bundle = fhirUtils.generateBundle("searchset", patients);
  return fhirUtils.buildResponse(200, bundle);
}

function createPatient(patientData: any): APIGatewayProxyResult {
  // In a real implementation, this would validate and save to a database
  if (!patientData) {
    return fhirUtils.buildResponse(400, { message: "Invalid patient data" });
  }

  const newPatient = {
    ...patientData,
    id: uuidv4(),
    resourceType: "Patient",
  };

  try {
    fhirUtils.validateResource(newPatient, "Patient");
    return fhirUtils.buildResponse(201, newPatient);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
