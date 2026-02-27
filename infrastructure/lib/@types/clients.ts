import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
export interface Clients {
    dynamoDB: DynamoDBClient;
}
