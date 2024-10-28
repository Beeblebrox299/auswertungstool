'use client';

import React from "react";
import ManualInput from "@/app/components/Project/edit/ManualInput";

/*
TODO: Make the distinction between categories and fields clearer.
*/

const Manual: React.FC = () => {
    return (
        <div className="displayBlock">
            <ManualInput/>
        </div>
    )
}

export default Manual;