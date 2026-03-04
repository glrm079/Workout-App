import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Routine } from '../../../@types/routine';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { deleteRoutine } from '../../../utils/lambda/routine/deleteRoutine';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Routine;
    const { userId, routineId } = body;

    try {
        if (!userId || !routineId) {
            return generateLambdaResponse({ error: 'Missing required fields: userId and routineId' }, 400);
        }

        const { success, message, error: saveError } = await deleteRoutine(userId, routineId, new DynamoDBClient({}));

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to delete routine' }, 400);
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
