import { Timeline } from '../../../@types/timeline';

type validCreateTimelineInput = {
    payload: Partial<Timeline>;
};

export const validCreateTimeline = ({ payload }: validCreateTimelineInput) => {
    const { userId, exerciseId, routineId, date } = payload;

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    if (!exerciseId || typeof exerciseId !== 'string') {
        return { error: new Error('exerciseId is required') };
    }

    if (!routineId || typeof routineId !== 'string') {
        return { error: new Error('routineId is required') };
    }

    if (!date || typeof date !== 'string' || isNaN(Date.parse(date))) {
        return { error: new Error('A valid date is required') };
    }

    return { error: null };
};
