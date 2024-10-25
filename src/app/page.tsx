'use client';

import Link from 'next/link';
import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className='displayBlock info'>
            <h1>Wilkommen beim Auswertungstool!</h1>
            <span>Möchten Sie ein Projekt starten?</span>
            <br/>
            <Link className='btn' href={"/edit/init"}>Start</Link>
        </div>
    );
}

export default Dashboard;