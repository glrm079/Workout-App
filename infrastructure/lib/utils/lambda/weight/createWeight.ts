import { Weight } from '../../../@types/weight';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';

type CreateWeightInput = {
    payload: Partial<Weight>;
    dynamoClient: DynamoDBClient;
};

export const createWeight = async ({ payload, dynamoClient }: CreateWeightInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        weightId: uuidv4(),
        createdAt: executionTime,
        updatedAt: executionTime,
        enabled: true
    };

    const putItemCommand = new PutItemCommand({
        TableName: process.env.WEIGHT_TABLE_NAME,
        Item: marshall(completeCreationPayload)
    });

    try {
        await dynamoClient.send(putItemCommand);
        return {
            success: true,
            message: 'Weight logged successfully'
        };
    } catch (error) {
        console.error('Error logging weight: ', error);
        return {
            success: false,
            message: 'Failed to log weight',
            error
        };
    }
};
