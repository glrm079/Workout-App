import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoTables } from './constructs/database/dynamo/index';

export class mainStack extends cdk.Stack {
    public readonly dynamoTables: DynamoTables;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.dynamoTables = new DynamoTables(this, 'DynamoTables', {
            importOnly: false
        });
    }
}
