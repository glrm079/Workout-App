import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoTables } from './constructs/database/dynamo/index';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { ApiEndpoints } from './constructs/api-endpoints/index';

export class mainStack extends cdk.Stack {
    public readonly dynamoTables: DynamoTables;
    public readonly apiGateway: apigateway.RestApi;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.dynamoTables = new DynamoTables(this, 'DynamoTables', {
            importOnly: false
        });

        const api = new apigateway.RestApi(this, 'WorkoutApi');

        new ApiEndpoints(this, 'ApiEndpoints', {
            dynamoTables: this.dynamoTables,
            apiGateway: api
        });
    }
}
