'use client';

import React from 'react';
import Sidebar from '../components/Navigation/Navbar';
import FileUpload from '../components/Project/FileUpload';
import ManualInput from '../components/Project/ManualInput';

const Edit: React.FC = () => {
    return (
        <div>
          <Sidebar/>
          <FileUpload/>
          <ManualInput/>    
        </div>
    );
}

export default Edit;