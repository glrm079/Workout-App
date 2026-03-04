import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Routine } from '../../../@types/routine';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

type getRoutineInput = {
    payload: Partial<Routine>;
    dynamoClient: DynamoDBClient;
};

export const getRoutine = async ({ payload, dynamoClient }: getRoutineInput) => {
    try {
        const { userId, routineId } = payload;
        const isSpecific = !!routineId;

        const command = new QueryCommand({
            TableName: process.env.CATEGORIES_TABLE_NAME,
            KeyConditionExpression: isSpecific ? 'userId = :userId AND routineId = :routineId' : 'userId = :userId',
            ExpressionAttributeValues: marshall(
                isSpecific
                    ? {
                          ':userId': userId,
                          ':routineId': routineId
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
        console.error('Error creating routine: ', error);
        return {
            success: false,
            message: 'Failed to create routine',
            error
        };
    }
};
