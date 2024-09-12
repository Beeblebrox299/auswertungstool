import React, { createContext, useContext, useState } from 'react';

const ContributionContext = createContext<{ contributionArray: any[]; setContributionArray: (data: any[]) => void } | undefined>(undefined);

export const ContributionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contributionArray, setContributionArray] = useState<any[]>([]);

    return (        
        <ContributionContext.Provider value={{ contributionArray, setContributionArray }}>
            {children}
        </ContributionContext.Provider>
    );
};

export const useContribution = () => {
    const context = useContext(ContributionContext);
    if (!context) {
        throw new Error("useContribution must be used within a ContributionProvider");
    }
    return context;
};