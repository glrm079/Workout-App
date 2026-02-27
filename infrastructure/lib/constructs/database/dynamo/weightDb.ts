import { Construct } from 'constructs';
import { DatabaseConstructor } from '../index';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { DynamoTablesProps } from './index';

export class weighTDatabase extends Construct {
    public readonly weightDatabase: DatabaseConstructor;
    constructor(scope: Construct, id: string, props: DynamoTablesProps) {
        super(scope, id);

        this.weightDatabase = new DatabaseConstructor(this, 'WeightDatabase', {
            name: 'WeightDatabase',
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'categoryId',
                type: AttributeType.STRING
            }
        });

        new StringParameter(this, 'WeightDatabaseTableNameParameter', {
            parameterName: '/weightDatabase/tableName',
            stringValue: this.weightDatabase.tableName,
            description: 'DynamoDB Table Name for Weight'
        });
    }
}
