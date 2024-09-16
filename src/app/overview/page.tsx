'use client';

import React from 'react';
import Sidebar from '../components/Navigation/Navbar';
import ContributionTable from '../components/Project/ContributionTable';

const Overview: React.FC = () => {
    return (
        <div>
          <Sidebar/>
          <ContributionTable/>
        </div>
    );
}

export default Overview;