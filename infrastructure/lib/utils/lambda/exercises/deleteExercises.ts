import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

export const deleteExercises = async (userId: string, exerciseId: string, dynamoClient: DynamoDBClient) => {
    try {
        const deleteCommand = new DeleteItemCommand({
            TableName: process.env.EXERCISES_TABLE_NAME,
            Key: marshall({
                userId,
                exerciseId
            })
        });

        await dynamoClient.send(deleteCommand);
        return {
            success: true,
            message: 'Exercise deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting exercise: ', error);
        return {
            success: false,
            message: 'Failed to delete exercise',
            error
        };
    }
};
