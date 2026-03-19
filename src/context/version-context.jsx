'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const VersionContext = createContext(null);

export function VersionProvider({ children }) {
    const [version, setVersion] = useState('v2');
    const [highReadability, setHighReadability] = useState(false);

    useEffect(() => {
        const savedVersion = localStorage.getItem('portfolio-version');
        const savedReadability = localStorage.getItem('portfolio-readability');
        
        if (savedVersion) setVersion(savedVersion);
        if (savedReadability) setHighReadability(savedReadability === 'true');
    }, []);

    const toggleVersion = () => {
        const newVersion = version === 'v1' ? 'v2' : 'v1';
        setVersion(newVersion);
        localStorage.setItem('portfolio-version', newVersion);
    };

    const toggleReadability = () => {
        const newValue = !highReadability;
        setHighReadability(newValue);
        localStorage.setItem('portfolio-readability', newValue.toString());
    };

    return (
        <VersionContext.Provider value={{ 
            version, 
            setVersion, 
            toggleVersion, 
            highReadability, 
            toggleReadability 
        }}>
            {children}
        </VersionContext.Provider>
    );
}

export function useVersion() {
    const context = useContext(VersionContext);
    if (!context) {
        throw new Error('useVersion must be used within a VersionProvider');
    }
    return context;
}
