import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Timeline } from '../../../@types/timeline';
import { v4 as uuidv4 } from 'uuid';

type CreateTimelineInput = {
    payload: Partial<Timeline>;
    dynamoClient: DynamoDBClient;
};

export const createTimeline = async ({ payload, dynamoClient }: CreateTimelineInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        timelineId: uuidv4(),
        createdAt: executionTime,
        updatedAt: executionTime
    };

    const putItemCommand = new PutItemCommand({
        TableName: process.env.TIMELINE_TABLE_NAME,
        Item: marshall(completeCreationPayload)
    });

    try {
        await dynamoClient.send(putItemCommand);
        return {
            success: true,
            message: 'Timeline created successfully'
        };
    } catch (error) {
        console.error('Error creating timeline: ', error);
        return {
            success: false,
            message: 'Failed to create timeline',
            error
        };
    }
};
