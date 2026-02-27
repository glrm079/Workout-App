import { routineEndpoints } from './routine-endpoints';
import { weightEndpoints } from './weight-endpoint';
import { exercisesEndpoints } from './exercises-endpoints';
import { categoriesEndpoints } from './categories-endpoint';
import { timelineEndpoints } from './timeline-endpoints';
import { Construct } from 'constructs/lib/construct';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { DynamoTables } from '../database/dynamo';

interface ApiEndpointsProps {
    dynamoTables: DynamoTables;
    apiGateway: apigateway.RestApi;
}

export class ApiEndpoints extends Construct {
    constructor(scope: Construct, id: string, props: ApiEndpointsProps) {
        super(scope, id);

        new routineEndpoints(this, 'RoutineEndpoints', {
            routineTable: props.dynamoTables.routineDatabase.routineDatabase,
            apiGateway: props.apiGateway
        });

        new exercisesEndpoints(this, 'ExercisesEndpoints', {
            exercisesTable: props.dynamoTables.exercisesDatabase.exercisesDatabase,
            apiGateway: props.apiGateway
        });

        new categoriesEndpoints(this, 'CategoriesEndpoints', {
            categoriesTable: props.dynamoTables.categoriesDatabase.categoriesDatabase,
            apiGateway: props.apiGateway
        });

        new timelineEndpoints(this, 'TimelineEndpoints', {
            timelineTable: props.dynamoTables.timelineDatabase.timelineDatabase,
            apiGateway: props.apiGateway
        });

        new weightEndpoints(this, 'WeightEndpoints', {
            weightTable: props.dynamoTables.weightDatabase.weightDatabase,
            apiGateway: props.apiGateway
        });
    }
}
