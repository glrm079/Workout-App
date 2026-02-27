import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { createWeight } from '../../../utils/lambda/weight/createWeight';
import { Weight } from '../../../@types/weight';
import { validCreateWeight } from '../../../utils/lambda/weight/validCreateWeight';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    const body = event.body as unknown as Weight;
    const { userId, date, weight } = body;

    try {
        const { error } = await validCreateWeight({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await createWeight({
            payload: {
                userId,

                date
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to create timeline' }, 400);
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
