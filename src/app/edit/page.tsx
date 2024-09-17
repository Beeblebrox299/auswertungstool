'use client';

import React from 'react';
import FileUpload from '../components/Project/FileUpload';
import ManualInput from '../components/Project/ManualInput';

const Edit: React.FC = () => {
    return (
        <div>
              <FileUpload/>
              <ManualInput/> 
        </div>
    );
}

export default Edit;