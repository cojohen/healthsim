import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const observationId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (observationId) {
        return getObservation(observationId);
      } else {
        return getObservations();
      }
    case "POST":
      return createObservation(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getObservation(id: string): APIGatewayProxyResult {
  // Note: We need to add generateObservation to mockDataGenerator
  const observation = mockDataGenerator.generateObservation();
  observation.id = id;
  return fhirUtils.buildResponse(200, observation);
}

function getObservations(): APIGatewayProxyResult {
  const observations = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateObservation()
  );
  const bundle = fhirUtils.generateBundle("searchset", observations);
  return fhirUtils.buildResponse(200, bundle);
}

function createObservation(observationData: any): APIGatewayProxyResult {
  if (!observationData) {
    return fhirUtils.buildResponse(400, {
      message: "Invalid observation data",
    });
  }

  const newObservation = {
    ...observationData,
    id: uuidv4(),
    resourceType: "Observation",
  };

  try {
    fhirUtils.validateResource(newObservation, "Observation");
    return fhirUtils.buildResponse(201, newObservation);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
