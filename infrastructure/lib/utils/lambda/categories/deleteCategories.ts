import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const deleteCategories = async (userId: string, categoryId: string, dynamoClient: DynamoDBClient) => {
    try {
        const deleteCommand = new DeleteItemCommand({
            TableName: process.env.CATEGORIES_TABLE_NAME,
            Key: marshall({
                userId,
                categoryId
            })
        });

        await dynamoClient.send(deleteCommand);
        return {
            success: true,
            message: 'Category deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting category: ', error);
        return {
            success: false,
            message: 'Failed to delete category',
            error
        };
    }
};
