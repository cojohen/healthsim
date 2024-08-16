import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import * as fhirUtils from "../utils/fhirUtils";
import * as mockDataGenerator from "../utils/mockDataGenerator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const diagnosticReportId = event.pathParameters?.id;

  switch (httpMethod) {
    case "GET":
      if (diagnosticReportId) {
        return getDiagnosticReport(diagnosticReportId);
      } else {
        return getDiagnosticReports();
      }
    case "POST":
      return createDiagnosticReport(event.body ? JSON.parse(event.body) : null);
    default:
      return fhirUtils.buildResponse(405, { message: "Method Not Allowed" });
  }
};

function getDiagnosticReport(id: string): APIGatewayProxyResult {
  const diagnosticReport = mockDataGenerator.generateDiagnosticReport();
  diagnosticReport.id = id;
  return fhirUtils.buildResponse(200, diagnosticReport);
}

function getDiagnosticReports(): APIGatewayProxyResult {
  const diagnosticReports = Array.from({ length: 10 }, () =>
    mockDataGenerator.generateDiagnosticReport()
  );
  const bundle = fhirUtils.generateBundle("searchset", diagnosticReports);
  return fhirUtils.buildResponse(200, bundle);
}

function createDiagnosticReport(
  diagnosticReportData: any
): APIGatewayProxyResult {
  if (!diagnosticReportData) {
    return fhirUtils.buildResponse(400, {
      message: "Invalid diagnostic report data",
    });
  }

  const newDiagnosticReport = {
    ...diagnosticReportData,
    id: uuidv4(),
    resourceType: "DiagnosticReport",
  };

  try {
    fhirUtils.validateResource(newDiagnosticReport, "DiagnosticReport");
    return fhirUtils.buildResponse(201, newDiagnosticReport);
  } catch (error) {
    return fhirUtils.buildResponse(400, { message: (error as Error).message });
  }
}
