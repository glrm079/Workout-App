import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Weight } from '../../../@types/weight';

type updateWeightInput = {
    payload: Partial<Weight>;
    dynamoClient: DynamoDBClient;
};

export const updateWeight = async ({ payload, dynamoClient }: updateWeightInput) => {
    const executionTime = new Date().toISOString();

    const updateItemCommand = new UpdateItemCommand({
        TableName: process.env.WEIGHT_TABLE_NAME,
        Key: marshall({
            userId: payload.userId,
            exerciseId: payload.weightId
        }),
        UpdateExpression: `
            displayName = :displayName,
            description = :description,
            weight = :weight,
            weightId: :weightId,
            updatedAt = :updatedAt,
            date = :date
    `,
        ExpressionAttributeValues: marshall({
            weightId: payload.weightId,
            date: payload.date,
            ':weight': payload.weight,
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
