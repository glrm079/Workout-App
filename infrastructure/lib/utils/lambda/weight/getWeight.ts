import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Weight } from '../../../@types/weight';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

type getWeightInput = {
    payload: Partial<Weight>;
    dynamoClient: DynamoDBClient;
};

export const getWeight = async ({ payload, dynamoClient }: getWeightInput) => {
    try {
        const { userId, weightId } = payload;
        const isSpecific = !!weightId;

        const command = new QueryCommand({
            TableName: process.env.WEIGHT_TABLE_NAME,
            KeyConditionExpression: isSpecific ? 'userId = :userId AND weightId = :weightId' : 'userId = :userId',
            ExpressionAttributeValues: marshall(
                isSpecific
                    ? {
                          ':userId': userId,
                          ':weightId': weightId
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
        console.error('Error getting weight: ', error);
        return {
            success: false,
            message: 'Failed to get weight',
            error
        };
    }
};
