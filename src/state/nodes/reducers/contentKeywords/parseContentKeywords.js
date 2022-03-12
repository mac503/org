import {estimates} from "./estimates";

const contentKeywords = new Map([
    ...estimates,
]);

export const parseContentKeywords = (content) => {
    for (const [regExp, parseFunction] of contentKeywords.entries()) {
        let match;
        if (null !== (match = content.match(regExp))) {

            return {
                content: content.replace(regExp, ''),
                ...parseFunction(...match.slice(1)),
            }
        }
    }
};