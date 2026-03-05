'use client';

import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(undefined);

export function UIProvider({ children }) {
    const [isArchModalOpen, setIsArchModalOpen] = useState(false);

    const openArchModal = () => setIsArchModalOpen(true);
    const closeArchModal = () => setIsArchModalOpen(false);

    return (
        <UIContext.Provider value={{ isArchModalOpen, openArchModal, closeArchModal }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
