import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

interface LambdaFunctionsProps {
    categoriesTable: dynamodb.Table;
    apiGateway: cdk.aws_apigateway.LambdaRestApi;
}

export class categoriesEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: LambdaFunctionsProps) {
        super(scope, id);

        const categoriesResource = props.apiGateway.root.addResource('categories');

        const createCategories = new NodejsFunction(this, `${id}CreateCategories`, {
            functionName: 'CreateCategories',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/categories/create-categories.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                CATEGORIES_TABLE_NAME: props.categoriesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'CreateCategoriesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const updateCategories = new NodejsFunction(this, `${id}UpdateCategories`, {
            functionName: 'UpdateCategories',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/categories/update-categories.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                CATEGORIES_TABLE_NAME: props.categoriesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'UpdateCategories LogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const deleteCategories = new NodejsFunction(this, `${id}DeleteCategories`, {
            functionName: 'DeleteCategories',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/categories/delete-categories.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                CATEGORIES_TABLE_NAME: props.categoriesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'DeleteCategoriesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const getCategories = new NodejsFunction(this, `${id}GetCategories`, {
            functionName: 'GetCategories',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/categories/get-categories.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                CATEGORIES_TABLE_NAME: props.categoriesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'GetCategoriesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        props.categoriesTable.grantReadWriteData(createCategories);
        props.categoriesTable.grantReadWriteData(updateCategories);
        props.categoriesTable.grantReadWriteData(deleteCategories);
        props.categoriesTable.grantReadData(getCategories);

        categoriesResource.addMethod('POST', new apigateway.LambdaIntegration(createCategories));
        categoriesResource.addMethod('PUT', new apigateway.LambdaIntegration(updateCategories));
        categoriesResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteCategories));
        categoriesResource.addMethod('GET', new apigateway.LambdaIntegration(getCategories));
    }
}
