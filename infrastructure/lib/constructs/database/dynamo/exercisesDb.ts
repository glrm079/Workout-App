import { Construct } from 'constructs';
import { DatabaseConstructor } from '../index';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export interface DynamoTableProps {
    importOnly?: boolean;
}

export class exercisesDatabase extends Construct {
    public readonly exercisesDatabase: DatabaseConstructor;
    constructor(scope: Construct, id: string, props: DynamoTableProps) {
        super(scope, id);

        this.exercisesDatabase = new DatabaseConstructor(this, 'ExercisesDatabase', {
            name: 'ExercisesDatabase',
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'exerciseId',
                type: AttributeType.STRING
            }
        });

        new StringParameter(this, 'ExercisesDatabaseTableNameParameter', {
            parameterName: '/exercisesDatabase/tableName',
            stringValue: this.exercisesDatabase.tableName,
            description: 'DynamoDB Table Name for Exercises'
        });
    }
}
