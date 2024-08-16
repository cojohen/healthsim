import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const allergyIntoleranceId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (allergyIntoleranceId) {
        return getAllergyIntolerance(allergyIntoleranceId);
      } else {
        return getAllergyIntolerances();
      }
    case "POST":
      return createAllergyIntolerance(
        event.body ? JSON.parse(event.body) : null
      );
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getAllergyIntolerance(id: string): APIGatewayProxyResult {
  // Note: We need to add generateAllergyIntolerance to mockDataGenerator
  const allergyIntolerance = mockDataGenerator.generateAllergyIntolerance();
  allergyIntolerance.id = id;
  return fhirUtils.buildResponse(200, allergyIntolerance);
}

function getAllergyIntolerances(): APIGatewayProxyResult {
  const allergyIntolerances = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateAllergyIntolerance()
  );
  const bundle = fhirUtils.generateBundle("searchset", allergyIntolerances);
  return fhirUtils.buildResponse(200, bundle);
}

function createAllergyIntolerance(
  allergyIntoleranceData: any
): APIGatewayProxyResult {
  if (!allergyIntoleranceData) {
    return fhirUtils.buildResponse(400, {
      message: "Invalid allergy intolerance data",
    });
  }

  const newAllergyIntolerance = {
    ...allergyIntoleranceData,
    id: uuidv4(),
    resourceType: "AllergyIntolerance",
  };

  try {
    fhirUtils.validateResource(newAllergyIntolerance, "AllergyIntolerance");
    return fhirUtils.buildResponse(201, newAllergyIntolerance);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
