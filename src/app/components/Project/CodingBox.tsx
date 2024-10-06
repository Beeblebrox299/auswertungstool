import React from "react";

const CodingBox: React.FC<{contributionWithId: Record<string, any>, contributionArray:Record<string, any>[]}> = ({contributionWithId, contributionArray}) => {
    const contributionContent = {...contributionWithId};
    delete contributionContent.id
    // TODO: Show contribution, add dropdown to choose category, save category selection
    return(
        <div className="displayBlock">
            <div className="info border">
                text
            </div>
        </div>
    );
}

export default CodingBox;