import { Routine } from '../../../@types/routine';

type validUpdateRoutineInput = {
    payload: Partial<Routine>;
};

export const validUpdateRoutine = ({ payload }: validUpdateRoutineInput) => {
    const { displayName, description, userId, routineId } = payload;

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

    if (routineId === undefined || typeof routineId !== 'string') {
        return { error: new Error('routineId is required and must be a string') };
    }

    return { error: null };
};
