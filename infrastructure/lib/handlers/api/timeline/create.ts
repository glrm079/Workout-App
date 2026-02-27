import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validCreateTimeline } from '../../../utils/lambda/timeline/validCreateTimeline';
import { createTimeline } from '../../../utils/lambda/timeline/createTimeline';
import { Timeline } from '../../../@types/timeline';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    const body = event.body as unknown as Timeline;
    const { userId, exerciseId, routineId, date } = body;

    try {
        const { error } = await validCreateTimeline({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await createTimeline({
            payload: {
                userId,
                exerciseId,
                routineId,
                date
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to create timeline' }, 400);
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
