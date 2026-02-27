import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { createExercises } from '../../../utils/lambda/exercises/createExercises';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validCreateExercises } from '../../../utils/lambda/exercises/validCreateExercises';
import { Exercise } from '../../../@types/exercises';


export const lambdaHandler = async (event: APIGatewayEvent) => {
    const body = event.body as unknown as Exercise;
    const { displayName, routineIds, userId, description } = body;

    try {
        const { error } = await validCreateExercises({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await createExercises({
            payload: {
                displayName,
                routineIds,
                description,
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
