import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

interface LambdaFunctionsProps {
    timelineTable: dynamodb.Table;
    apiGateway: cdk.aws_apigateway.LambdaRestApi;
}

export class timelineEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: LambdaFunctionsProps) {
        super(scope, id);

        const timelineResource = props.apiGateway.root.addResource('timeline');

        const createTimeline = new NodejsFunction(this, `${id}CreateTimeline`, {
            functionName: 'CreateTimeline',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/timeline/create-timeline.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                TIMELINE_TABLE_NAME: props.timelineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'CreateTimelineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const updateTimeline = new NodejsFunction(this, `${id}UpdateTimeline`, {
            functionName: 'UpdateTimeline',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/timeline/update-timeline.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                TIMELINE_TABLE_NAME: props.timelineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'UpdateTimelineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const deleteTimeline = new NodejsFunction(this, `${id}DeleteTimeline`, {
            functionName: 'DeleteTimeline',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/timeline/delete-timeline.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                TIMELINE_TABLE_NAME: props.timelineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'DeleteTimelineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        const getTimeline = new NodejsFunction(this, `${id}GetTimeline`, {
            functionName: 'GetTimeline',
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: './lib/handlers/api/backend/timeline/get-timeline.ts',
            handler: 'handler',
            memorySize: 512,
            timeout: cdk.Duration.seconds(30),

            environment: {
                TIMELINE_TABLE_NAME: props.timelineTable.tableName
            },

            logGroup: new logs.LogGroup(this, 'GetTimelineLogGroup', {
                retention: logs.RetentionDays.ONE_MONTH
            })
        });

        props.timelineTable.grantReadWriteData(createTimeline);
        props.timelineTable.grantReadWriteData(updateTimeline);
        props.timelineTable.grantReadWriteData(deleteTimeline);
        props.timelineTable.grantReadData(getTimeline);

        timelineResource.addMethod('POST', new apigateway.LambdaIntegration(createTimeline));
        timelineResource.addMethod('PUT', new apigateway.LambdaIntegration(updateTimeline));
        timelineResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteTimeline));
        timelineResource.addMethod('GET', new apigateway.LambdaIntegration(getTimeline));
    }
}
