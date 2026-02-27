import { Exercise } from '../../../@types/exercises';

type validCreateRoutineInput = {
    payload: Partial<Exercise>;
};

export const validCreateExercises = ({ payload }: validCreateRoutineInput) => {
    const { displayName, description, userId, routineIds } = payload;

    if (!displayName || typeof displayName !== 'string') {
        return { error: new Error('displayName is required and must be a string') };
    }

    if (!displayName.trim()) {
        return { error: new Error('displayName cannot be empty') };
    }

    if (description && typeof description !== 'string') {
        return { error: new Error('description must be a string') };
    }

    if (!routineIds) {
        return { error: new Error('routineIds must be filled') };
    }

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    return { error: null };
};
