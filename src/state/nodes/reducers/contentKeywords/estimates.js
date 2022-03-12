export const MINUTE = 1;
export const HOUR = 60;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export const estimates = [
    [/\b(\d+)m\b/, (minutes) => ({
        estimate: Number(minutes),
    })],
    [/\b(\d+)h\b/, (hours) => ({
        estimate: Number(hours) * HOUR,
    })],
    [/\b(\d+)d\b/, (days) => ({
        estimate: Number(days) * DAY,
    })],
    [/\b(\d+)w\b/, (weeks) => ({
        estimate: Number(weeks) * WEEK,
    })],
    [/\b(\d+)h(\d+)m\b/, (hours, minutes) => ({
        estimate: (Number(hours) * HOUR) + Number(minutes),
    })],
    [/\b(\d+)d(\d+)h(\d+)m\b/, (days, hours, minutes) => ({
        estimate: (Number(days) * DAY) + (Number(hours) * HOUR) + Number(minutes),
    })],
    [/\b(\d+)w(\d+)d(\d+)h(\d+)m\b/, (weeks, days, hours, minutes) => ({
        estimate: (Number(weeks) * WEEK) + (Number(days) * DAY) + (Number(hours) * HOUR) + Number(minutes),
    })],
    [/\b(\d+)w(\d+)d(\d+)h\b/, (weeks, days, hours) => ({
        estimate: (Number(weeks) * WEEK) + (Number(days) * DAY) + (Number(hours) * HOUR),
    })],
    [/\b(\d+)w(\d+)d\b/, (weeks, days) => ({
        estimate: (Number(weeks) * WEEK) + (Number(days) * DAY),
    })],
    [/\b(\d+)d(\d+)h\b/, (days, hours) => ({
        estimate: (Number(days) * DAY) + (Number(hours) * HOUR),
    })],
];