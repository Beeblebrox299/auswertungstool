'use client';

import React from 'react';
import FileUpload from './components/FileUpload';
import { ContributionProvider } from './Contexts';
import ManualInput from './components/ManualInput';
import ContributionTable from './components/ContributionTable';

const Dashboard: React.FC = () => {
    return (
        <div>
          <ContributionProvider>
            <FileUpload/>
            <ManualInput/>
            <ContributionTable/>
          </ContributionProvider>
        </div>
    );
}

export default Dashboard;