import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Routine } from '../../../@types/routine';

type UpdateRoutineInput = {
    payload: Partial<Routine>;
    dynamoClient: DynamoDBClient;
};

export const updateRoutine = async ({ payload, dynamoClient }: UpdateRoutineInput) => {
    const executionTime = new Date().toISOString();

    const updateItemCommand = new UpdateItemCommand({
        TableName: process.env.ROUTINE_TABLE_NAME,
        Key: marshall({
            userId: payload.userId,
            routineId: payload.routineId
        }),
        UpdateExpression: `
            displayName = :displayName,
            description = :description,
            updatedAt = :updatedAt
            userId = :userId,
            routineId = :routineId
    `,
        ExpressionAttributeValues: marshall({
            ':displayName': payload.displayName,
            ':description': payload.description,
            ':userId': payload.userId,
            ':routineId': payload.routineId,
            ':updatedAt': executionTime
        }),
        ConditionExpression: 'attribute_exists(routineId)'
    });

    try {
        await dynamoClient.send(updateItemCommand);
        return {
            success: true,
            message: 'Routine updated successfully'
        };
    } catch (error) {
        console.error('Error updating routine: ', error);
        return {
            success: false,
            message: 'Failed to update routine',
            error
        };
    }
};
