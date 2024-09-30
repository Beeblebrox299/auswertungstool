'use client';

import React from 'react';
import { useMemo, useRef } from 'react';
import Link from 'next/link';
import FileUpload from '../components/Project/FileUpload';
import ManualInput from '../components/Project/ManualInput';

const Edit: React.FC = () => {
  const projectExists = useRef<boolean>(false);
  useMemo(() => {
      projectExists.current = localStorage.getItem("contributions") !== null || localStorage.getItem("categories") !== null;
  }, [])
    return (
        <div>
          {projectExists.current ? ( 
            <>
              <FileUpload/>
              <ManualInput/>
              <Link href={"edit/categories"}>Kategorien und Eingabefelder bearbeiten</Link>
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