import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Exercise } from '../../../@types/exercises';
import { v4 as uuidv4 } from 'uuid';

type CreateExerciseInput = {
    payload: Partial<Exercise>;
    dynamoClient: DynamoDBClient;
};

export const createExercises = async ({ payload, dynamoClient }: CreateExerciseInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        exerciseId: uuidv4(),
        createdAt: executionTime,
        updatedAt: executionTime
    };

    const putItemCommand = new PutItemCommand({
        TableName: process.env.EXERCISES_TABLE_NAME,
        Item: marshall(completeCreationPayload)
    });

    try {
        await dynamoClient.send(putItemCommand);
        return {
            success: true,
            message: 'Exercise created successfully'
        };
    } catch (error) {
        console.error('Error creating exercise: ', error);
        return {
            success: false,
            message: 'Failed to create exercise',
            error
        };
    }
};
