import { Construct } from 'constructs';
import { DatabaseConstructor } from '../index';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Key } from 'aws-cdk-lib/aws-kms';

export interface DynamoTableProps {
    importOnly?: boolean;
}

export class RoutineDatabase extends Construct {
    public readonly routineDatabase: DatabaseConstructor;
    constructor(scope: Construct, id: string, props: DynamoTableProps) {
        super(scope, id);

        this.routineDatabase = new DatabaseConstructor(this, 'RoutineDatabase', {
            name: 'RoutineDatabase',
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'routineId',
                type: AttributeType.STRING
            }
        });

        new StringParameter(this, 'RoutineDatabaseTableNameParameter', {
            parameterName: '/routineDatabase/tableName',
            stringValue: this.routineDatabase.tableName,
            description: 'DynamoDB Table Name for Routines'
        });
    }
}
