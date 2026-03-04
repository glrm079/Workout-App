import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Timeline } from '../../../@types/timeline';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

type getTimelineInput = {
    payload: Partial<Timeline>;
    dynamoClient: DynamoDBClient;
};

export const getTimeline = async ({ payload, dynamoClient }: getTimelineInput) => {
    try {
        const { userId, timelineId } = payload;
        const isSpecific = !!timelineId;

        const command = new QueryCommand({
            TableName: process.env.TIMELINE_TABLE_NAME,
            KeyConditionExpression: isSpecific ? 'userId = :userId AND timelineId = :timelineId' : 'userId = :userId',
            ExpressionAttributeValues: marshall(
                isSpecific
                    ? {
                          ':userId': userId,
                          ':timelineId': timelineId
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
        console.error('Error getting timeline: ', error);
        return {
            success: false,
            message: 'Failed to get timeline',
            error
        };
    }
};
