import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Exercise } from '../../../@types/exercises';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { deleteExercises } from '../../../utils/lambda/exercises/deleteExercises';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Exercise;
    const { userId, exerciseId } = body;

    try {
        if (!userId || !exerciseId) {
            return generateLambdaResponse({ error: 'Missing required fields: userId and exerciseId' }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await deleteExercises(userId, exerciseId, new DynamoDBClient({}));

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to delete exercise' }, 400);
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
