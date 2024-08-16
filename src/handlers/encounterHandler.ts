import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const encounterId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (encounterId) {
        return getEncounter(encounterId);
      } else {
        return getEncounters();
      }
    case "POST":
      return createEncounter(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getEncounter(id: string): APIGatewayProxyResult {
  const encounter = mockDataGenerator.generateEncounter();
  encounter.id = id;
  return fhirUtils.buildResponse(200, encounter);
}

function getEncounters(): APIGatewayProxyResult {
  const encounters = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateEncounter()
  );
  const bundle = fhirUtils.generateBundle("searchset", encounters);
  return fhirUtils.buildResponse(200, bundle);
}

function createEncounter(encounterData: any): APIGatewayProxyResult {
  if (!encounterData) {
    return fhirUtils.buildResponse(400, { message: "Invalid encounter data" });
  }

  const newEncounter = {
    ...encounterData,
    id: uuidv4(),
    resourceType: "Encounter",
  };

  try {
    fhirUtils.validateResource(newEncounter, "Encounter");
    return fhirUtils.buildResponse(201, newEncounter);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
