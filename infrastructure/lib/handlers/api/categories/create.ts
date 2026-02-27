import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { Categories } from '../../../@types/categories';
import { generateLambdaResponse } from '../../../utils/helpers/generateLambdaResponde';
import { createCategories } from '../../../utils/lambda/categories/createCategories';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { validCreateCategories } from '../../../utils/lambda/categories/validCreateCategories';

export const lambdaHandler = async (event: APIGatewayEvent) => {
    const body = event.body as unknown as Categories;
    const { displayName, color, exercisesId, userId } = body;

    try {
        const { error } = await validCreateCategories({ payload: body });

        if (error) {
            return generateLambdaResponse({ error: error.message }, 400);
        }

        const {
            success,
            message,
            error: saveError
        } = await createCategories({
            payload: {
                displayName,
                color,
                exercisesId,
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
