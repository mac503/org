import React from "react";
import {useNode} from "../../../state/nodes/hooks/useNode";
import {minutesToWdhm} from "../../../helpers/minutesToWdhm";

export const Estimate = ({id}) => {
    const {estimate} = useNode(id);

    return <>
        {
            (estimate && estimate > 0)
                ? <span className="estimate">
                    {minutesToWdhm(estimate)}
                </span>
                : null
        }
    </>;
};