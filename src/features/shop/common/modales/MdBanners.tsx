import { useModal } from "@/shared/hooks/useModal";
import { Modal } from "@/shared/ui";
import FrmAddBanner from "../../banners/components/forms/FrmAddBanner";
import FrmEditBanner from "../../banners/components/forms/FrmEditBanner";
import { useBannerStore } from "../store/useBannerStore";
import { Image } from "lucide-react";

export default function MdBanners() {
    const modalAdd = useModal("md-banners-add");
    const modalEdit = useModal("md-banners-edit");
    const { info } = useBannerStore();

    return (
        <div>
            <Modal
                isOpen={modalAdd.isOpen}
                onClose={() => modalAdd.close()}
                title="Nuevo Banner"
                position="top"
                className="md:w-150"
                icon={<Image size={20} />}
                description="Las imágenes se optimizarán automáticamente a WebP"
            >
                <FrmAddBanner />
            </Modal>

            <Modal
                isOpen={modalEdit.isOpen}
                onClose={() => modalEdit.close()}
                title="Editar Banner"
                position="top"
                className="md:w-150"
                icon={<Image size={20} />}
            >
                <FrmEditBanner info={info ?? {}} onClose={() => modalEdit.close()} />
            </Modal>
        </div>
    );
}
