import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Routine } from '../../../@types/routine';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { updateRoutine } from '../../../utils/lambda/routine/updateRoutine';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validUpdateRoutine } from '../../../utils/lambda/routine/validUpdateRoutine';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Routine;
    const { displayName, description, userId, routineId } = body;

    try {
        const { error } = await validUpdateRoutine({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await updateRoutine({
            payload: {
                displayName,
                description,
                routineId,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to update routine' }, 400);
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
