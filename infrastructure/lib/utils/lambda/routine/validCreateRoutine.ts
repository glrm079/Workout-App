import { Routine } from '../../../@types/routine';

type validCreateRoutineInput = {
    payload: Partial<Routine>;
};

export const validCreateRoutine = ({ payload }: validCreateRoutineInput) => {
    const { displayName, description, userId } = payload;

    if (!displayName || typeof displayName !== 'string') {
        return { error: new Error('displayName is required and must be a string') };
    }

    if (!displayName.trim()) {
        return { error: new Error('displayName cannot be empty') };
    }

    if (description && typeof description !== 'string') {
        return { error: new Error('description must be a string') };
    }

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    return { error: null };
};
