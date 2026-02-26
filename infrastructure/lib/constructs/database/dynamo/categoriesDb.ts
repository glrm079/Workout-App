import { Construct } from 'constructs';
import { DatabaseConstructor } from '../index';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export interface DynamoTableProps {
    importOnly?: boolean;
}

export class categoriesDatabase extends Construct {
    public readonly categoriesDatabase: DatabaseConstructor;
    constructor(scope: Construct, id: string, props: DynamoTableProps) {
        super(scope, id);

        this.categoriesDatabase = new DatabaseConstructor(this, 'CategoriesDatabase', {
            name: 'CategoriesDatabase',
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            sortKey: {
                name: 'categoryId',
                type: AttributeType.STRING
            }
        });

        new StringParameter(this, 'CategoriesDatabaseTableNameParameter', {
            parameterName: '/categoriesDatabase/tableName',
            stringValue: this.categoriesDatabase.tableName,
            description: 'DynamoDB Table Name for Categories'
        });
    }
}
