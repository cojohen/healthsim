import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const immunizationId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (immunizationId) {
        return getImmunization(immunizationId);
      } else {
        return getImmunizations();
      }
    case "POST":
      return createImmunization(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getImmunization(id: string): APIGatewayProxyResult {
  const immunization = mockDataGenerator.generateImmunization();
  immunization.id = id;
  return fhirUtils.buildResponse(200, immunization);
}

function getImmunizations(): APIGatewayProxyResult {
  const immunizations = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateImmunization()
  );
  const bundle = fhirUtils.generateBundle("searchset", immunizations);
  return fhirUtils.buildResponse(200, bundle);
}

function createImmunization(immunizationData: any): APIGatewayProxyResult {
  if (!immunizationData) {
    return fhirUtils.buildResponse(400, {
      message: "Invalid immunization data",
    });
  }

  const newImmunization = {
    ...immunizationData,
    id: uuidv4(),
    resourceType: "Immunization",
  };

  try {
    fhirUtils.validateResource(newImmunization, "Immunization");
    return fhirUtils.buildResponse(201, newImmunization);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
