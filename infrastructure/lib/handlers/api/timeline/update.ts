import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Timeline } from '../../../@types/timeline';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { updateTimeline } from '../../../utils/lambda/timeline/updateTimeline';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validUpdateTimeline } from '../../../utils/lambda/timeline/validUpdateTimeline';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Timeline;
    const { sets, userId, timelineId, exerciseId } = body;

    try {
        const { error } = await validUpdateTimeline({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await updateTimeline({
            payload: {
                sets,
                exerciseId,
                timelineId,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to create category' }, 400);
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
