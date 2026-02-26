import { Construct } from 'constructs';
import { DatabaseConstructor } from '../index';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export interface DynamoTableProps {
    importOnly?: boolean;
}

export class timelineDatabase extends Construct {
    public readonly timelineDatabase: DatabaseConstructor;
    constructor(scope: Construct, id: string, props: DynamoTableProps) {
        super(scope, id);

        this.timelineDatabase = new DatabaseConstructor(this, 'TimelineDatabase', {
            name: 'TimelineDatabase',
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'timelineId',
                type: AttributeType.STRING
            }
        });

        new StringParameter(this, 'TimelineDatabaseTableNameParameter', {
            parameterName: '/timelineDatabase/tableName',
            stringValue: this.timelineDatabase.tableName,
            description: 'DynamoDB Table Name for Timeline'
        });
    }
}
