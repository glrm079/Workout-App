import { Construct } from 'constructs';
import { RoutineDatabase } from './routineDb';
import { timelineDatabase } from './timelineDb';
import { categoriesDatabase } from './categoriesDb';
import { exercisesDatabase } from './exercisesDb';

interface DynamoTablesProps {
    importOnly?: boolean;
}

export class DynamoTables extends Construct {
    public readonly routineDatabase: RoutineDatabase;
    public readonly timelineDatabase: timelineDatabase;
    public readonly categoriesDatabase: categoriesDatabase;
    public readonly exercisesDatabase: exercisesDatabase;

    constructor(scope: Construct, id: string, props: DynamoTablesProps) {
        super(scope, id);

        this.routineDatabase = new RoutineDatabase(this, 'RoutineDatabase', {
            importOnly: props.importOnly || false
        });

        this.timelineDatabase = new timelineDatabase(this, 'TimelineDatabase', {
            importOnly: props.importOnly || false
        });

        this.categoriesDatabase = new categoriesDatabase(this, 'CategoriesDatabase', {
            importOnly: props.importOnly || false
        });

        this.exercisesDatabase = new exercisesDatabase(this, 'ExercisesDatabase', {
            importOnly: props.importOnly || false
        });
    }
}
