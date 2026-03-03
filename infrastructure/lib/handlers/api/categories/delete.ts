import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Categories } from '../../../@types/categories';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { deleteCategories } from '../../../utils/lambda/categories/deleteCategories';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Categories;
    const { userId, categoryId } = body;

    try {
        if (!userId || !categoryId) {
            return generateLambdaResponse({ error: 'Missing required fields: userId and categoryId' }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await deleteCategories(userId, categoryId, new DynamoDBClient({}));

        if (!success) {
            return generateLambdaResponse({ error: saveError || 'Failed to delete category' }, 400);
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
