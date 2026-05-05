"use client";

import React, {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";

interface ModalProps {
    title: string,
    closeable?: boolean
    content: React.ReactNode
}

interface ModalContextValue {
    show: (modal: ModalProps) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({children}: PropsWithChildren) {
    const [modal, setModal] = useState<ModalProps | null>(null);

    const show = useCallback((next: ModalProps) => {
        setModal(prev => {
            if (prev !== null) {
                throw new Error("A modal is already open");
            }
            return next;
        });
    }, []);

    const close = useCallback(() => {
        setModal(null);
    }, []);

    const isCloseable = modal?.closeable !== false;

    return (
        <ModalContext.Provider value={{show}}>
            {children}
            {modal && (
                <div role="dialog" aria-modal="true" aria-label={modal.title}>
                    <h2>{modal.title}</h2>
                    <div>{modal.content}</div>
                    {isCloseable && (
                        <button type="button" onClick={close}>Close</button>
                    )}
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal(): ModalContextValue {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return ctx;
}
