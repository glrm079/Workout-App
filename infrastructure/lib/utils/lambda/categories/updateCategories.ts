import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Categories } from '../../../@types/categories';

type CreateRoutineInput = {
    payload: Partial<Categories>;
    dynamoClient: DynamoDBClient;
};

export const updateCategories = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        updatedAt: executionTime
    };

    const updateItemCommand = new UpdateItemCommand({
        TableName: process.env.CATEGORIES_TABLE_NAME,
        Key: marshall({
            userId: payload.userId,
            categoryId: payload.categoryId
        }),
        UpdateExpression: `
        SET displayName = :displayName,
            color = :color,
            exercisesId = :exercisesId,
            updatedAt = :updatedAt
    `,
        ExpressionAttributeValues: marshall({
            ':displayName': payload.displayName,
            ':color': payload.color,
            ':exercisesId': payload.exercisesId,
            ':updatedAt': executionTime
        }),
        ConditionExpression: 'attribute_exists(categoryId)'
    });

    try {
        await dynamoClient.send(updateItemCommand);
        return {
            success: true,
            message: 'Category created successfully'
        };
    } catch (error) {
        console.error('Error creating category: ', error);
        return {
            success: false,
            message: 'Failed to create category',
            error
        };
    }
};
