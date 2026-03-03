import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Exercise } from '../../../@types/exercises';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

type CreateRoutineInput = {
    payload: Partial<Exercise>;
    dynamoClient: DynamoDBClient;
};

export const getExercises = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    try {
        const { userId, exerciseId } = payload;
        const isSpecific = !!exerciseId;

        const command = new QueryCommand({
            TableName: process.env.EXERCISES_TABLE_NAME,
            KeyConditionExpression: isSpecific ? 'userId = :userId AND exerciseId = :exerciseId' : 'userId = :userId',
            ExpressionAttributeValues: marshall(
                isSpecific
                    ? {
                          ':userId': userId,
                          ':exerciseId': exerciseId
                      }
                    : {
                          ':userId': userId
                      }
            )
        });

        const response = await dynamoClient.send(command);

        const items = response.Items?.map((item) => unmarshall(item)) ?? [];

        return {
            success: true,
            data: isSpecific ? (items[0] ?? null) : items
        };
    } catch (error) {
        console.error('Error getting exercises: ', error);
        return {
            success: false,
            message: 'Failed to get exercises',
            error
        };
    }
};
