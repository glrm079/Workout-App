import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Weight } from '../../../@types/weight';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getWeight } from '../../../utils/lambda/weight/getWeight';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Weight;
    const { userId, weightId } = body;

    try {
        const {
            success,
            message,
            error: saveError
        } = await getWeight({
            payload: {
                weightId,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to get weight' }, 400);
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
