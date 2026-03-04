import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Timeline } from '../../../@types/timeline';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { deleteTimeline } from '../../../utils/lambda/timeline/deleteTimeline';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Timeline;
    const { userId, timelineId } = body;

    try {
        if (!userId || !timelineId) {
            return generateLambdaResponse({ error: 'Missing required fields: userId and timelineId' }, 400);
        }

        const { success, message, error: saveError } = await deleteTimeline(userId, timelineId, new DynamoDBClient({}));

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to delete timeline' }, 400);
        }

        return generateLambdaResponse(
            {
                message
            },
            200
        );
    } catch (e) {
        console.log('Error: ', e);
        return generateLambdaResponse({ error: 'Internal Server Error' }, 500);
    }
};

export const handler = lambdaHandler;
