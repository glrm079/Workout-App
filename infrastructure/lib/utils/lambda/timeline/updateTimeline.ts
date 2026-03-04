import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Timeline } from '../../../@types/timeline';

type updateTimelineInput = {
    payload: Partial<Timeline>;
    dynamoClient: DynamoDBClient;
};

export const updateTimeline = async ({ payload, dynamoClient }: updateTimelineInput) => {
    const executionTime = new Date().toISOString();

    const updateItemCommand = new UpdateItemCommand({
        TableName: process.env.TIMELINE_TABLE_NAME,
        Key: marshall({
            userId: payload.userId,
            timelineId: payload.timelineId
        }),
        UpdateExpression: `
            timelineId = :timelineId,
            updatedAt = :updatedAt
            exerciseIdId = :exerciseId
            sets = :sets
    `,
        ExpressionAttributeValues: marshall({
            ':timelineId': payload.timelineId,
            ':updatedAt': executionTime,
            ':exercisesId': payload.exerciseId,
            ':sets': payload.sets
        }),
        ConditionExpression: 'attribute_exists(timelineId)'
    });

    try {
        await dynamoClient.send(updateItemCommand);
        return {
            success: true,
            message: 'Timeline updated successfully'
        };
    } catch (error) {
        console.error('Error updating timeline: ', error);
        return {
            success: false,
            message: 'Failed to update timeline',
            error
        };
    }
};
