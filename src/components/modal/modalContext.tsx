"use client";

import React, {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    title: string,
    closeable?: boolean
    content: React.ReactNode
}

interface ModalContextValue {
    show: (modal: ModalProps) => void;
    close: () => void;
    closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({children}: PropsWithChildren) {
    const [modals, setModals] = useState<Array<ModalProps>>([]);
    const currentModal = modals.length ? modals[modals.length - 1] : null;

    const show = useCallback((next: ModalProps) => {
        setModals(prev => [...prev, next]);
    }, []);

    const close = useCallback(() => {
        setModals((m) => m.slice(0, -1));
    }, []);

    const closeAll = useCallback(() => {
        setModals([]);
    }, []);

    return (
        <ModalContext.Provider value={{show, close, closeAll}}>
            {children}
            {currentModal && (
                <div className={styles.backDrop}>
                    <div role="dialog" aria-modal="true" aria-label={currentModal.title} className={styles.window}>
                        <header>
                            <h2>{currentModal.title}</h2>
                            {currentModal.closeable !== false && (<button type="button" onClick={close}>Close</button>)}
                        </header>
                        <div>{currentModal.content}</div>
                    </div>

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
