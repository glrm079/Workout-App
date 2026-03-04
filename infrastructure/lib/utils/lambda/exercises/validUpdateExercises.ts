import { Exercise } from '../../../@types/exercises';

type validUpdateExercisesInput = {
    payload: Partial<Exercise>;
};

export const validUpdateExercises = ({ payload }: validUpdateExercisesInput) => {
    const { displayName, description, userId, routineIds, exerciseId } = payload;

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

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    if (!exerciseId || typeof exerciseId !== 'string') {
        return { error: new Error('exerciseId is required and must be a string') };
    }

    return { error: null };
};
