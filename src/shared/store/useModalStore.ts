import { create } from "zustand";

type ModalState = {
    isOpen: boolean;
    data?: any;
};

interface ModalStore {
    modals: Record<string, ModalState>;

    openModal: (id: string, data?: any) => void;
    closeModal: (id: string) => void;
    toggleModal: (id: string, data?: any) => void;
    isOpen: (id: string) => boolean;
    getData: (id: string) => any;
}

export const useModalStore = create<ModalStore>((set, get) => ({
    modals: {},

    openModal: (id, data) =>
        set((state) => ({
            modals: {
                ...state.modals,
                [id]: { isOpen: true, data },
            },
        })),

    closeModal: (id) =>
        set((state) => ({
            modals: {
                ...state.modals,
                [id]: { isOpen: false },
            },
        })),

    toggleModal: (id, data) => {
        const current = get().modals[id]?.isOpen ?? false;
        current
            ? get().closeModal(id)
            : get().openModal(id, data);
    },

    isOpen: (id) => !!get().modals[id]?.isOpen,
    getData: (id) => get().modals[id]?.data,
}));
