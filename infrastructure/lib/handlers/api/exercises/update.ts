import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Exercise } from '../../../@types/exercises';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { updateExercises } from '../../../utils/lambda/exercises/updateExercises';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validUpdateExercise } from '../../../utils/lambda/exercises/validUpdateExercises';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Exercise;
    const { displayName, description, userId, exerciseId } = body;

    try {
        const { error } = await validUpdateExercise({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await updateExercises({
            payload: {
                displayName,
                description,
                exerciseId,
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
