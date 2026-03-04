import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Weight } from '../../../@types/weight';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validUpdateWeight } from '../../../utils/lambda/weight/validUpdateWeight';
import { updateWeight } from '../../../utils/lambda/weight/updateExercises';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Weight;
    const { userId, weightId, weight, date } = body;

    try {
        const { error } = await validUpdateWeight({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await updateWeight({
            payload: {
                weightId,
                weight,
                date,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to update weight' }, 400);
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
