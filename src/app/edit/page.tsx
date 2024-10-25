'use client';

import React, { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import FileUpload from '../components/Project/edit/FileUpload';
import ManualInput from '../components/Project/edit/ManualInput';

const Edit: React.FC = () => {
  const [projectExists, setProjectExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
      setProjectExists(localStorage.getItem("contributions") !== null || localStorage.getItem("categories") !== null);
      setLoading(false)
  }, []);

  if (loading) {
    return(<></>)
  }

  return (
      <div>
        {projectExists ? ( 
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
            <Link className="btn" href='edit/categories'>Kategorien und Eingabefelder bearbeiten</Link>
          </div>
          </>
        ) : (
          <div className='displayBlock info'>
            Sie haben noch kein Projekt gestartet. Möchten Sie ein Projekt einrichten?
            <br/>
            <Link className='btn' href={"/edit/init"}>Start</Link>
          </div>
        )}   
      </div>
  );
}

export default Edit;