import {WEEK, DAY, HOUR, MINUTE} from "../state/nodes/reducers/contentKeywords/estimates";

const timeExpressions = {WEEK, DAY, HOUR, MINUTE};

export const minutesToWdhm = (estimateInMinutes) => {
    let minutes = estimateInMinutes;

    return Object.entries(timeExpressions)
        .map(([timeExpressionName, timeExpressionValue]) => {
            const amount = Math.floor(minutes / timeExpressionValue);

            if (amount > 0) {
                minutes = minutes % timeExpressionValue;
                return `${amount}${timeExpressionName[0].toLowerCase()}`;
            }

            return '';
        })
        .join('');
}