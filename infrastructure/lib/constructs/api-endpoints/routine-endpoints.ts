import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

interface LambdaFunctionsProps {
    routineTable: dynamodb.Table;
    apiGateway: cdk.aws_apigateway.LambdaRestApi;
}

export class routineEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: LambdaFunctionsProps) {
        super(scope, id);

        const routineResource = props.apiGateway.root.addResource('routine');

        const createRoutine = new NodejsFunction(this, `${id}CreateRoutine`, {
            functionName: 'CreateRoutine',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/routine/create-routine.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                ROUTINE_TABLE_NAME: props.routineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'CreateRoutineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const updateRoutine = new NodejsFunction(this, `${id}UpdateRoutine`, {
            functionName: 'UpdateRoutine',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/routine/update-routine.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                ROUTINE_TABLE_NAME: props.routineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'UpdateRoutineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const deleteRoutine = new NodejsFunction(this, `${id}DeleteRoutine`, {
            functionName: 'DeleteRoutine',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/routine/delete-routine.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                ROUTINE_TABLE_NAME: props.routineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'DeleteRoutineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const getRoutine = new NodejsFunction(this, `${id}GetRoutine`, {
            functionName: 'GetRoutine',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/routine/get-routine.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                ROUTINE_TABLE_NAME: props.routineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'GetRoutineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        props.routineTable.grantReadWriteData(createRoutine);
        props.routineTable.grantReadWriteData(updateRoutine);
        props.routineTable.grantReadWriteData(deleteRoutine);
        props.routineTable.grantReadData(getRoutine);

        routineResource.addMethod('POST', new apigateway.LambdaIntegration(createRoutine));
        routineResource.addMethod('PUT', new apigateway.LambdaIntegration(updateRoutine));
        routineResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteRoutine));
        routineResource.addMethod('GET', new apigateway.LambdaIntegration(getRoutine));
    }
}
