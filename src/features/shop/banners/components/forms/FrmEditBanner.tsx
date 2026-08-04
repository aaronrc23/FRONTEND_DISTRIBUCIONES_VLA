import { useBannerCrudMutation } from "@/features/shop/common/hooks/useCrudBanners";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { InputFile } from "@/shared/ui/inputfile";
import { showConfirmation, showWarning } from "@/shared/hooks/useSwalert";
import { Button } from "@/shared/ui";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import {
    BANNER_RECOMMENDED_WIDTH,
    BANNER_RECOMMENDED_HEIGHT,
    BANNER_MAX_WIDTH,
    BANNER_MAX_HEIGHT,
    getImageDimensions,
} from "@/features/shop/common/libs/BannerSchema";

export default function FrmEditBanner({ info, onClose }: any) {
    const [file, setFile] = useState<File | null>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

    const methods = useForm({
        defaultValues: {
            id: info?.id ?? "",
            enlace: info?.enlace ?? "",
            orden: info?.orden ?? 0,
        },
    });

    const { EditBannerMut } = useBannerCrudMutation({ onClose });

    const handleFileChange = async (f: File | null) => {
        setFile(f);
        if (f) {
            try {
                const dims = await getImageDimensions(f);
                setDimensions(dims);

                if (dims.width > BANNER_MAX_WIDTH || dims.height > BANNER_MAX_HEIGHT) {
                    showWarning(
                        "Imagen muy grande",
                        `La imagen tiene ${dims.width}×${dims.height}px. El máximo recomendado es ${BANNER_MAX_WIDTH}×${BANNER_MAX_HEIGHT}px.`
                    );
                } else if (dims.width < BANNER_RECOMMENDED_WIDTH * 0.5 || dims.height < BANNER_RECOMMENDED_HEIGHT * 0.5) {
                    showWarning(
                        "Imagen muy pequeña",
                        `La imagen tiene ${dims.width}×${dims.height}px. El tamaño recomendado es ${BANNER_RECOMMENDED_WIDTH}×${BANNER_RECOMMENDED_HEIGHT}px y se ampliará, puede verse borrosa.`
                    );
                }
            } catch {
                setDimensions(null);
            }
        } else {
            setDimensions(null);
        }
    };

    const onSubmit = async (data: any) => {
        const isconfirm = await showConfirmation(
            "¿Estás seguro de editar el banner?"
        );
        if (!isconfirm) return;
        EditBannerMut.mutate({ ...data, imagen: file });
    };

    const isDimOk =
        dimensions &&
        dimensions.width <= BANNER_MAX_WIDTH &&
        dimensions.height <= BANNER_MAX_HEIGHT;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
            >
                <FrInput
                    type="text"
                    control={methods.control}
                    label="Enlace"
                    name="enlace"
                    placeholder="Ej: /productos/ofertas"
                />

                <FrInput
                    type="number"
                    control={methods.control}
                    label="Orden"
                    name="orden"
                    placeholder="Ej: 1"
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">
                        Imagen del Banner (opcional)
                    </label>
                    <p className="text-xs text-muted-foreground ml-1 mb-1">
                        Formatos: JPG, PNG, WebP · Máx 5MB · Se optimizará a WebP
                    </p>
                    <p className="text-xs text-blue-600 ml-1 mb-1 font-medium">
                        Recomendado: {BANNER_RECOMMENDED_WIDTH}×{BANNER_RECOMMENDED_HEIGHT}px · Máx: {BANNER_MAX_WIDTH}×{BANNER_MAX_HEIGHT}px
                    </p>

                    {/* Imagen actual */}
                    {info?.url_imagen && !file && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border mb-2">
                            <img
                                src={info.url_imagen}
                                alt="Banner actual"
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 left-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                                Imagen actual
                            </span>
                        </div>
                    )}

                    {file && (
                        <div className="space-y-2 mb-2">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-1 left-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                                    Nueva imagen
                                </span>
                            </div>

                            {/* Indicador de dimensiones */}
                            {dimensions && (
                                <div
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                        isDimOk
                                            ? "bg-green-50 text-green-700 border border-green-200"
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                >
                                    {isDimOk ? (
                                        <CheckCircle className="w-4 h-4 shrink-0" />
                                    ) : (
                                        <AlertTriangle className="w-4 h-4 shrink-0" />
                                    )}
                                    <span>
                                        <strong>{dimensions.width}×{dimensions.height}px</strong>
                                        {isDimOk
                                            ? " — Dimensiones válidas"
                                            : ` — Supera el máximo de ${BANNER_MAX_WIDTH}×${BANNER_MAX_HEIGHT}px`}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <InputFile
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex gap-2 justify-center pt-2">
                    <Button type="submit" className="cursor-pointer" variant="primary">
                        Guardar cambios
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
