export interface Timeline {
    timelineId: string;
    userId: string;
    exerciseId: string;
    routineId: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    sets: WorkoutSet[];
}

export interface WorkoutSet {
    weight: number;
    reps: number;
    createdAt: string;
    updatedAt: string;
}
