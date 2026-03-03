import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Exercise } from '../../../@types/exercises';

type CreateRoutineInput = {
    payload: Partial<Exercise>;
    dynamoClient: DynamoDBClient;
};

export const updateExercises = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    const executionTime = new Date().toISOString();

    const updateItemCommand = new UpdateItemCommand({
        TableName: process.env.EXERCISES_TABLE_NAME,
        Key: marshall({
            userId: payload.userId,
            exerciseId: payload.exerciseId
        }),
        UpdateExpression: `
            displayName = :displayName,
            description = :description,
            exercisesId = :exercisesId,
            updatedAt = :updatedAt
    `,
        ExpressionAttributeValues: marshall({
            ':displayName': payload.displayName,
            ':description': payload.description,
            ':exercisesId': payload.exerciseId,
            ':updatedAt': executionTime
        }),
        ConditionExpression: 'attribute_exists(exerciseId)'
    });

    try {
        await dynamoClient.send(updateItemCommand);
        return {
            success: true,
            message: 'Exercise updated successfully'
        };
    } catch (error) {
        console.error('Error updating exercise: ', error);
        return {
            success: false,
            message: 'Failed to update exercise',
            error
        };
    }
};
