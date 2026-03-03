import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Categories } from '../../../@types/categories';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { updateCategories } from '../../../utils/lambda/categories/updateCategories';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validUpdateCategories } from '../../../utils/lambda/categories/validUpdateCategories';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return generateLambdaResponse({ error: 'Missing body' }, 400);
    }

    const body = JSON.parse(event.body) as Categories;
    const { displayName, color, exercisesId, userId, categoryId } = body;

    try {
        const { error } = await validUpdateCategories({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await updateCategories({
            payload: {
                displayName,
                color,
                exercisesId,
                userId,
                categoryId
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
