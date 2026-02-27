import { Routine } from '../../../@types/routine';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';

type CreateRoutineInput = {
    payload: Partial<Routine>;
    dynamoClient: DynamoDBClient;
};

export const createRoutine = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        routineID: uuidv4(),
        createdAt: executionTime,
        updatedAt: executionTime
    };

    const putItemCommand = new PutItemCommand({
        TableName: process.env.ROUTINE_TABLE_NAME,
        Item: marshall(completeCreationPayload)
    });

    try {
        await dynamoClient.send(putItemCommand);
        return {
            success: true,
            message: 'Routine created successfully'
        };
    } catch (error) {
        console.error('Error creating routine: ', error);
        return {
            success: false,
            message: 'Failed to create routine',
            error
        };
    }
};
