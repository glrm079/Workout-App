import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Routine } from '../../../@types/routine';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { createRoutine } from '../../../utils/lambda/routine/createRoutine';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validCreateRoutine } from '../../../utils/lambda/routine/validCreateRoutine';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    const body = event.body as unknown as Routine;
    const { displayName, description, userId } = body;

    try {
        const { error } = await validCreateRoutine({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await createRoutine({
            payload: {
                displayName,
                description,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to create routine' }, 400);
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
