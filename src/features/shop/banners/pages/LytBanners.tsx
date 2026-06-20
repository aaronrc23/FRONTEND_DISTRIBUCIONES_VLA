import PlantCrud from "@/shared/components/templates/PlantCrud";
import { Button } from "@/shared/ui";
import { Icon } from "@iconify-icon/react";
import { useModal } from "@/shared/hooks/useModal";
import { useListarBanners } from "../../common/hooks/useCrudBanners";
import BannerCardGrid from "../components/BannerCardGrid";
import MdBanners from "../../common/modales/MdBanners";

export default function LytBanners() {
    const { data } = useListarBanners();
    const modalAdd = useModal("md-banners-add");

    return (
        <div className="h-full w-full">
            <PlantCrud
                title="Banners de Inicio"
                header={
                    <Button
                        className="cursor-pointer"
                        onClick={() => modalAdd.open()}
                    >
                        <Icon icon="mdi:plus" className="text-xl" />
                        Nuevo Banner
                    </Button>
                }
            >
                <div className="pt-4 px-1">
                    <BannerCardGrid data={data || []} />
                </div>
            </PlantCrud>
            <MdBanners />
        </div>
    );
}
