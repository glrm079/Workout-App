import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

interface LambdaFunctionsProps {
    exercisesTable: dynamodb.Table;
    apiGateway: cdk.aws_apigateway.LambdaRestApi;
}

export class exercisesEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: LambdaFunctionsProps) {
        super(scope, id);

        const exercisesResource = props.apiGateway.root.addResource('exercises');

        const createExercises = new NodejsFunction(this, `${id}CreateExercises`, {
            functionName: 'CreateExercises',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/exercises/create.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                EXERCISES_TABLE_NAME: props.exercisesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'CreateExercisesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const updateExercises = new NodejsFunction(this, `${id}UpdateExercises`, {
            functionName: 'UpdateExercises',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/exercises/update.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                EXERCISES_TABLE_NAME: props.exercisesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'UpdateExercisesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const deleteExercises = new NodejsFunction(this, `${id}DeleteExercises`, {
            functionName: 'DeleteExercises',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/exercises/delete.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                EXERCISES_TABLE_NAME: props.exercisesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'DeleteExercisesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const getExercises = new NodejsFunction(this, `${id}GetExercises`, {
            functionName: 'GetExercises',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/exercises/get.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                EXERCISES_TABLE_NAME: props.exercisesTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'GetExercisesLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        props.exercisesTable.grantReadWriteData(createExercises);
        props.exercisesTable.grantReadWriteData(updateExercises);
        props.exercisesTable.grantReadWriteData(deleteExercises);
        props.exercisesTable.grantReadData(getExercises);

        exercisesResource.addMethod('POST', new apigateway.LambdaIntegration(createExercises));
        exercisesResource.addMethod('PUT', new apigateway.LambdaIntegration(updateExercises));
        exercisesResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteExercises));
        exercisesResource.addMethod('GET', new apigateway.LambdaIntegration(getExercises));
    }
}
