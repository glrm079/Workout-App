import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const deleteWeight = async (userId: string, weightId: string, dynamoClient: DynamoDBClient) => {
    try {
        const deleteCommand = new DeleteItemCommand({
            TableName: process.env.WEIGHT_TABLE_NAME,
            Key: marshall({
                userId,
                weightId
            })
        });

        await dynamoClient.send(deleteCommand);
        return {
            success: true,
            message: 'Weight deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting weight: ', error);
        return {
            success: false,
            message: 'Failed to delete weight',
            error
        };
    }
};
