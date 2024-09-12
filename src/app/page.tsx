'use client';

import React from 'react';
import FileUpload from './components/FileUpload';
import { ContributionProvider } from './Contexts';

const Dashboard: React.FC = () => {
    return (
        <div>
          <ContributionProvider>
            <FileUpload/>
          </ContributionProvider>
        </div>
    );
}

export default Dashboard;