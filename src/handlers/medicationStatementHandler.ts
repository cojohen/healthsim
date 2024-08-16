import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const medicationStatementId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (medicationStatementId) {
        return getMedicationStatement(medicationStatementId);
      } else {
        return getMedicationStatements();
      }
    case "POST":
      return createMedicationStatement(
        event.body ? JSON.parse(event.body) : null
      );
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getMedicationStatement(id: string): APIGatewayProxyResult {
  const medicationStatement = mockDataGenerator.generateMedicationStatement();
  medicationStatement.id = id;
  return fhirUtils.buildResponse(200, medicationStatement);
}

function getMedicationStatements(): APIGatewayProxyResult {
  const medicationStatements = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateMedicationStatement()
  );
  const bundle = fhirUtils.generateBundle("searchset", medicationStatements);
  return fhirUtils.buildResponse(200, bundle);
}

function createMedicationStatement(
  medicationStatementData: any
): APIGatewayProxyResult {
  if (!medicationStatementData) {
    return fhirUtils.buildResponse(400, {
      message: "Invalid medication statement data",
    });
  }

  const newMedicationStatement = {
    ...medicationStatementData,
    id: uuidv4(),
    resourceType: "MedicationStatement",
  };

  try {
    fhirUtils.validateResource(newMedicationStatement, "MedicationStatement");
    return fhirUtils.buildResponse(201, newMedicationStatement);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
