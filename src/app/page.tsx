'use client';

import React from 'react';
import FileUpload from './components/FileUpload';
import ManualInput from './components/ManualInput';
import ContributionTable from './components/ContributionTable';

const Dashboard: React.FC = () => {
    return (
        <div>
          <FileUpload/>
          <ManualInput/>
          <ContributionTable/>
        </div>
    );
}

export default Dashboard;