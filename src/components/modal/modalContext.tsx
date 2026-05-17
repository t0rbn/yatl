"use client";

import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import styles from "./Modal.module.css";
import globalStyles from "@/globals.module.css";
import {Button} from "@/components/buttons/Buttons";
import {classNames} from "@/utils/classnames";

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
    const windowRef = useRef<HTMLDivElement>(null);

    const show = useCallback((next: ModalProps) => {
        setModals(prev => [...prev, next]);
    }, []);

    const close = useCallback(() => {
        setModals((m) => m.slice(0, -1));
    }, []);

    const closeAll = useCallback(() => {
        setModals([]);
    }, []);

    useEffect(() => {
        if (!currentModal || ! windowRef.current) {
            return;
        }

        const previouslyFocused = document.activeElement as HTMLElement | null;
        windowRef.current.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && currentModal.closeable !== false) {
                e.stopPropagation();
                close();
                return;
            }

        };

        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            previouslyFocused?.focus();
        };
    }, [currentModal, close]);

    const value = useMemo(() => ({show, close, closeAll}), [show, close, closeAll]);

    return (
        <ModalContext.Provider value={value}>
            {children}
            {currentModal && (
                <div className={styles.backDrop} key="modal-backdrop">
                    <div ref={windowRef} role="dialog" aria-modal="true" aria-label={currentModal.title}
                         tabIndex={-1} className={classNames(globalStyles.glass, styles.window)} key="modal">
                        <header>
                            <h2>{currentModal.title}</h2>
                            {currentModal.closeable !== false && (
                                <Button icon="close" variant="text" color="danger" onClick={close}/>)}
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
