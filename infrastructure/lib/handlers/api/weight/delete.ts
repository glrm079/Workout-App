import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Weight } from '../../../@types/weight';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { deleteWeight } from '../../../utils/lambda/weight/deleteWeight';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Weight;
    const { userId, weightId } = body;

    try {
        if (!userId || !weightId) {
            return generateLambdaResponse({ error: 'Missing required fields: userId and weightId' }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await deleteWeight(userId, weightId, new DynamoDBClient({}));

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to delete weight' }, 400);
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
