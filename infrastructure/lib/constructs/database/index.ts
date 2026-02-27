import { aws_dynamodb, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TableEncryption } from 'aws-cdk-lib/aws-dynamodb';

interface DatabaseConstructorProps {
    name: string;
    partitionKey: aws_dynamodb.Attribute;
    sortKey?: aws_dynamodb.Attribute;
    stream?: aws_dynamodb.StreamViewType;
}

/**
 * @summary Database Constructor
 * @description Responsible for create the DynamoDB table and its configuration.
 */
export class DatabaseConstructor extends aws_dynamodb.Table {
    constructor(scope: Construct, id: string, props: DatabaseConstructorProps) {
        super(scope, id, {
            partitionKey: props.partitionKey,
            sortKey: props.sortKey,
            tableName: props.name,
            billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            readCapacity: 5,
            writeCapacity: 5,
            deletionProtection: true,
            pointInTimeRecovery: true,
            encryption: TableEncryption.AWS_MANAGED,
            stream: props.stream,
            removalPolicy: RemovalPolicy.DESTROY
        });
    }
}
