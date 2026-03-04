import { Categories } from '../../../@types/categories';

type validUpdateCategoriesInput = {
    payload: Partial<Categories>;
};

export const validUpdateCategories = ({ payload }: validUpdateCategoriesInput) => {
    const { displayName, color, exercisesId, userId, categoryId } = payload;

    if (!displayName || typeof displayName !== 'string') {
        return { error: new Error('displayName is required and must be a string') };
    }

    if (categoryId === undefined || typeof categoryId !== 'string') {
        return { error: new Error('categoryId is required and must be a string') };
    }

    if (!displayName.trim()) {
        return { error: new Error('displayName cannot be empty') };
    }

    if (!color || typeof color !== 'string') {
        return { error: new Error('color is required and must be a string') };
    }

    if (
        !exercisesId ||
        !Array.isArray(payload.exercisesId) ||
        payload.exercisesId.some((id) => typeof id !== 'string')
    ) {
        return { error: new Error('exercisesId is required and must be an array of strings') };
    }

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    return { error: null };
};
