import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Categories } from '../../../@types/categories';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

type CreateRoutineInput = {
    payload: Partial<Categories>;
    dynamoClient: DynamoDBClient;
};

export const getCategories = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    try {
        const { userId, categoryId } = payload;
        const isSpecific = !!categoryId;

        const command = new QueryCommand({
            TableName: process.env.CATEGORIES_TABLE_NAME,
            KeyConditionExpression: isSpecific ? 'userId = :userId AND categoryId = :categoryId' : 'userId = :userId',
            ExpressionAttributeValues: marshall(
                isSpecific
                    ? {
                          ':userId': userId,
                          ':categoryId': categoryId
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
        console.error('Error creating category: ', error);
        return {
            success: false,
            message: 'Failed to create category',
            error
        };
    }
};
