import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const deleteRoutine = async (userId: string, routineId: string, dynamoClient: DynamoDBClient) => {
    try {
        const deleteCommand = new DeleteItemCommand({
            TableName: process.env.ROUTINES_TABLE_NAME,
            Key: marshall({
                userId,
                routineId
            })
        });

        await dynamoClient.send(deleteCommand);
        return {
            success: true,
            message: 'Routine deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting routine: ', error);
        return {
            success: false,
            message: 'Failed to delete routine',
            error
        };
    }
};
