import { useBannerCrudMutation } from "@/features/shop/common/hooks/useCrudBanners";
import { bannerSchema, type BannerSchema } from "@/features/shop/common/libs/BannerSchema";
import {
    BANNER_RECOMMENDED_WIDTH,
    BANNER_RECOMMENDED_HEIGHT,
    BANNER_MAX_WIDTH,
    BANNER_MAX_HEIGHT,
    getImageDimensions,
} from "@/features/shop/common/libs/BannerSchema";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { InputFile } from "@/shared/ui/inputfile";
import { showConfirmation, showError, showWarning } from "@/shared/hooks/useSwalert";
import { Button } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function FrmAddBanner() {
    const [file, setFile] = useState<File | null>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

    const methods = useForm<BannerSchema>({
        resolver: zodResolver(bannerSchema as any),
        defaultValues: {
            enlace: "",
            orden: 0,
        },
    });

    const { AddBannerMut } = useBannerCrudMutation();

    const handleCancel = () => {
        methods.reset();
        setFile(null);
        setDimensions(null);
    };

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

    const onSubmit = async (data: BannerSchema) => {
        if (!file) {
            showError("Error", "Debe seleccionar una imagen para el banner");
            return;
        }

        const isconfirm = await showConfirmation(
            "¿Estás seguro de guardar el banner?"
        );
        if (!isconfirm) return;

        AddBannerMut.mutate({ ...data, imagen: file });
    };

    const isDimOk =
        dimensions &&
        dimensions.width <= BANNER_MAX_WIDTH &&
        dimensions.height <= BANNER_MAX_HEIGHT;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit as any)}
                className="w-full flex justify-start flex-col gap-4"
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
                        Imagen del Banner <span className="text-destructive">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground ml-1 mb-1">
                        Formatos: JPG, PNG, WebP · Máx 5MB · Se optimizará a WebP
                    </p>
                    <p className="text-xs text-blue-600 ml-1 mb-1 font-medium">
                        Recomendado: {BANNER_RECOMMENDED_WIDTH}×{BANNER_RECOMMENDED_HEIGHT}px · Máx: {BANNER_MAX_WIDTH}×{BANNER_MAX_HEIGHT}px
                    </p>
                    <InputFile
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                    />
                </div>

                {file && (
                    <div className="space-y-2">
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
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

                <div className="flex gap-2 justify-center pt-2">
                    <Button type="submit" className="cursor-pointer" variant="primary">
                        Guardar
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        className="cursor-pointer"
                    >
                        Limpiar
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
