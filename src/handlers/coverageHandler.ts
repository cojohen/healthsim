import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const coverageId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (coverageId) {
        return getCoverage(coverageId);
      } else {
        return getCoverages();
      }
    case "POST":
      return createCoverage(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getCoverage(id: string): APIGatewayProxyResult {
  const coverage = mockDataGenerator.generateCoverage();
  coverage.id = id;
  return fhirUtils.buildResponse(200, coverage);
}

function getCoverages(): APIGatewayProxyResult {
  const coverages = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateCoverage()
  );
  const bundle = fhirUtils.generateBundle("searchset", coverages);
  return fhirUtils.buildResponse(200, bundle);
}

function createCoverage(coverageData: any): APIGatewayProxyResult {
  if (!coverageData) {
    return fhirUtils.buildResponse(400, { message: "Invalid coverage data" });
  }

  const newCoverage = {
    ...coverageData,
    id: uuidv4(),
    resourceType: "Coverage",
  };

  try {
    fhirUtils.validateResource(newCoverage, "Coverage");
    return fhirUtils.buildResponse(201, newCoverage);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
