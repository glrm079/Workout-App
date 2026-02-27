import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Categories } from '../../../@types/categories';
import { v4 as uuidv4 } from 'uuid';

type CreateRoutineInput = {
    payload: Partial<Categories>;
    dynamoClient: DynamoDBClient;
};

export const createCategories = async ({ payload, dynamoClient }: CreateRoutineInput) => {
    const executionTime = new Date().toISOString();
    const completeCreationPayload = {
        ...payload,
        categoryId: uuidv4(),
        createdAt: executionTime,
        updatedAt: executionTime,
        enabled: true
    };

    const putItemCommand = new PutItemCommand({
        TableName: process.env.CATEGORIES_TABLE_NAME,
        Item: marshall(completeCreationPayload)
    });

    try {
        await dynamoClient.send(putItemCommand);
        return {
            success: true,
            message: 'Category created successfully'
        };
    } catch (error) {
        console.error('Error creating category: ', error);
        return {
            success: false,
            message: 'Failed to create category',
            error
        };
    }
};
