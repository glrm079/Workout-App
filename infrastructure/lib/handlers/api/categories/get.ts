import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Categories } from '../../../@types/categories';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { getCategories } from '../../../utils/lambda/categories/getCategories';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Categories;
    const { userId, categoryId } = body;

    try {
        const {
            success,
            message,
            error: saveError
        } = await getCategories({
            payload: {
                categoryId,
                userId
            },
            dynamoClient: new DynamoDBClient({})
        });

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to get category' }, 400);
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
