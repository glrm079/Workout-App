import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Exercise } from '../../../@types/exercises';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getExercises } from '../../../utils/lambda/exercises/getExercises';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Exercise;
    const { userId, exerciseId } = body;

    try {
        const {
            success,
            message,
            error: saveError
        } = await getExercises({
            payload: {
                exerciseId,
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
