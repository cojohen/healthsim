# HealthSim

This project implements a mock backend for an Electronic Health Record (EHR) system using FHIR standards and the Serverless Framework.

## Prerequisites

- Node.js (v14.x or later)
- npm
- AWS CLI configured with your credentials
- Serverless Framework CLI

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Install Serverless Framework globally (if not already installed):
   ```
   npm install -g serverless
   ```

## Deployment

To deploy the stack to AWS:

```
npm run deploy
```

This will deploy to the default stage ('dev') and region ('us-east-1'). To specify a different stage or region:

```
serverless deploy --stage production --region us-west-2
```

## Local Development

To run the service locally:

```
npm run dev
```

This will start the service using serverless-offline, typically on http://localhost:3000.

## Testing

(To be added)
