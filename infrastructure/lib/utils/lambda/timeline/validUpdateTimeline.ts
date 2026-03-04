import { Timeline } from '../../../@types/timeline';

type validUpdateTimelineInput = {
    payload: Partial<Timeline>;
};

export const validUpdateTimeline = ({ payload }: validUpdateTimelineInput) => {
    const { userId, exerciseId, routineId, date, timelineId } = payload;

    if (!userId || typeof userId !== 'string') {
        return { error: new Error('user needs to be logged in') };
    }

    if (!timelineId || typeof timelineId !== 'string') {
        return { error: new Error('timelineId is required') };
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
