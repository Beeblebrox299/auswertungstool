'use client';

import Link from 'next/link';
import React from 'react';
import { getContributions } from './utils';

const Dashboard: React.FC = () => {
    const projectExists = getContributions().length > 0;
    return (
        <div className='displayBlock info'>
            <h1>Wilkommen beim Auswertungstool!</h1>
            {!projectExists ? (
                <div>
                    <span>Es sind noch keine Beiträge vorhanden. Möchten Sie ein Projekt starten?</span>
                    <br/>
                    <Link className='btn' href={"/edit/init"}>Start</Link>
                </div>
            ) : (
                <div>
                    <span>Sie haben bereits ein Projekt gestartet. Wo möchten Sie weitermachen?</span>
                    <br/><br/>
                    <div className='displayBlock'>
                    <h2>Beiträge hinzufügen</h2>
                        <Link className='btn' href={"/edit/file-upload"}>Datei hochladen</Link>
                        <Link className='btn' href={"/edit/manual"}>Manuell eingeben</Link>
                    </div>
                    <div className='displayBlock'>
                        <h2>Beiträge bearbeiten</h2>
                        <Link className='btn' href={"/edit/coding"}>Codierung</Link>
                    </div>
                    <div className='displayBlock'>
                        <h2>Auswertung</h2>
                        <Link className='btn' href={"/overview"}>Beiträge ansehen</Link>
                        <Link className='btn' href={"/analysis"}>Grafiken ansehen</Link>
                        <Link className='btn' href={"/report"}>Bericht erstellen</Link>
                    </div>
                    <div className='displayBlock'>
                        <h2>Weitere Einstellungen</h2>
                        <Link className='btn' href={"/categories"}>Kategorien und Datenfelder bearbeiten</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;