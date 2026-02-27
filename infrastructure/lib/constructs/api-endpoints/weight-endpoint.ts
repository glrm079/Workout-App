import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

interface LambdaFunctionsProps {
    weightTable: dynamodb.Table;
    apiGateway: cdk.aws_apigateway.LambdaRestApi;
}

export class weightEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: LambdaFunctionsProps) {
        super(scope, id);

        const weightResource = props.apiGateway.root.addResource('weight');

        const createWeight = new NodejsFunction(this, `${id}CreateWeight`, {
            functionName: 'CreateWeight',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/weight/create.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                WEIGHT_TABLE_NAME: props.weightTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'CreateWeightLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const updateWeight = new NodejsFunction(this, `${id}UpdateWeight`, {
            functionName: 'UpdateWeight',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/weight/update.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                WEIGHT_TABLE_NAME: props.weightTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'UpdateWeightLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const deleteWeight = new NodejsFunction(this, `${id}DeleteWeight`, {
            functionName: 'DeleteWeight',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/weight/delete.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                WEIGHT_TABLE_NAME: props.weightTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'DeleteWeightLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const getWeight = new NodejsFunction(this, `${id}GetWeight`, {
            functionName: 'GetWeight',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/weight/get.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                WEIGHT_TABLE_NAME: props.weightTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'GetWeightLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        props.weightTable.grantReadWriteData(createWeight);
        props.weightTable.grantReadWriteData(updateWeight);
        props.weightTable.grantReadWriteData(deleteWeight);
        props.weightTable.grantReadData(getWeight);

        weightResource.addMethod('POST', new apigateway.LambdaIntegration(createWeight));
        weightResource.addMethod('PUT', new apigateway.LambdaIntegration(updateWeight));
        weightResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteWeight));
        weightResource.addMethod('GET', new apigateway.LambdaIntegration(getWeight));
    }
}
