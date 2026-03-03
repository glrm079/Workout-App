import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const deleteTimeline = async (userId: string, timelineId: string, dynamoClient: DynamoDBClient) => {
    try {
        const deleteCommand = new DeleteItemCommand({
            TableName: process.env.TIMELINE_TABLE_NAME,
            Key: marshall({
                userId,
                timelineId
            })
        });

        await dynamoClient.send(deleteCommand);
        return {
            success: true,
            message: 'Timeline deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting timeline: ', error);
        return {
            success: false,
            message: 'Failed to delete timeline',
            error
        };
    }
};
