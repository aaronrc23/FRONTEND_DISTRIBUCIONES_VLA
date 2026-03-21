import { useModalStore } from "../store/useModalStore";

export function useModal(id: string) {
    const open = useModalStore((s) => s.openModal);
    const close = useModalStore((s) => s.closeModal);
    const toggle = useModalStore((s) => s.toggleModal);
    const isOpen = useModalStore((s) => s.isOpen(id));
    const data = useModalStore((s) => s.getData(id));

    return {
        isOpen,
        data,
        open: (data?: any) => open(id, data),
        close: () => close(id),
        toggle: (data?: any) => toggle(id, data),
    };
}
