import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Categories } from '../../../@types/categories';

type UpdateCategoriesInput = {
    payload: Partial<Categories>;
    dynamoClient: DynamoDBClient;
};

export const updateCategories = async ({ payload, dynamoClient }: UpdateCategoriesInput) => {
    const executionTime = new Date().toISOString();
 

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
            message: 'Category updated successfully'
        };
    } catch (error) {
        console.error('Error updating category: ', error);
        return {
            success: false,
            message: 'Failed to update category',
            error
        };
    }
};
