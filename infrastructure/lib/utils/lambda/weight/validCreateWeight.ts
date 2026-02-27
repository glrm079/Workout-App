import { Weight } from '../../../@types/weight';

type validCreateWeightInput = {
    payload: Partial<Weight>;
};

export const validCreateWeight = ({ payload }: validCreateWeightInput) => {
    const { userId, weight, date } = payload;

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('userId is required and must be a string') };
    }

    if (!weight || typeof weight !== 'number') {
        return { error: new Error('weight is required and must be a number') };
    }

    if (!date || typeof date !== 'string') {
        return { error: new Error('date is required and must be a string') };
    }

    return { error: null };
};
