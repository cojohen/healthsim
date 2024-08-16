import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const conditionId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (conditionId) {
        return getCondition(conditionId);
      } else {
        return getConditions();
      }
    case "POST":
      return createCondition(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getCondition(id: string): APIGatewayProxyResult {
  const condition = mockDataGenerator.generateCondition();
  condition.id = id;
  return fhirUtils.buildResponse(200, condition);
}

function getConditions(): APIGatewayProxyResult {
  const conditions = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateCondition()
  );
  const bundle = fhirUtils.generateBundle("searchset", conditions);
  return fhirUtils.buildResponse(200, bundle);
}

function createCondition(conditionData: any): APIGatewayProxyResult {
  if (!conditionData) {
    return fhirUtils.buildResponse(400, { message: "Invalid condition data" });
  }

  const newCondition = {
    ...conditionData,
    id: uuidv4(),
    resourceType: "Condition",
  };

  try {
    fhirUtils.validateResource(newCondition, "Condition");
    return fhirUtils.buildResponse(201, newCondition);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
