'use client';

import React from 'react';
import { useMemo, useRef } from 'react';
import Link from 'next/link';
import FileUpload from '../components/Project/edit/FileUpload';
import ManualInput from '../components/Project/edit/ManualInput';

const Edit: React.FC = () => {
  const projectExists = useRef<boolean>(true);
/* funktioniert nur auf dev, muss noch ne Lösung für prod finden
  useMemo(() => {
      projectExists.current = localStorage.getItem("contributions") !== null || localStorage.getItem("categories") !== null;
  }, [])*/
    return (
        <div>
          {projectExists.current ? ( 
            <>
            <div className='displayBlock'>
              <h1>Beiträge aus CSV-Datei importieren:</h1>
              <FileUpload/>
            </div>
            <div className='displayBlock'>
              <h1>Beitrag manuell eintragen:</h1>
              <ManualInput/>
            </div>
            <div className='displayBlock'>
              <button className="btn" onClick={() => {window.location.href='edit/categories'}}>Kategorien und Eingabefelder bearbeiten</button>
            </div>
            </>
          ) : (
            <>
              Sie haben noch kein Projekt gestartet. Möchten Sie <Link href={"/edit/init"}>ein Projekt einrichten</Link>?
            </>
          )}   
        </div>
    );
}

export default Edit;