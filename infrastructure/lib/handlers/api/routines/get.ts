import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getRoutine } from '../../../utils/lambda/routine/getRoutine';
import { Routine } from '../../../@types/routine';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Routine;
    const { userId, routineId } = body;

    try {
        const {
            success,
            message,
            error: saveError
        } = await getRoutine({
            payload: {
                routineId,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to get exercise' }, 400);
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
