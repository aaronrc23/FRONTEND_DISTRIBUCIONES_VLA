import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../../../../shared/ui';
import { Icon } from '@iconify-icon/react';

const MAX_IMAGES = 4;

export type ImgItem = ImgBase & {
    id?: number;          // existe en BD
    file?: File;          // imagen nueva
    url?: string;         // imagen existente
    orden: number;
    isPrincipal: boolean;
    _deleted?: boolean;   // soft delete frontend
};

export type ImgBase = {
    file?: File;
    orden: number;
    isPrincipal: boolean;
};


export type ImgCreate = ImgBase;

type FrmImgProps<T extends ImgBase> = {
    value?: T[];
    onChange?: (imgs: T[]) => void;
    onDeleteImage?: (img: T) => Promise<void> | void;
    onIsPrincipal?: (img: T) => Promise<void> | void;
};



export default function FrmImg<T extends ImgBase>({ value = [], onChange, onDeleteImage, onIsPrincipal }: FrmImgProps<T>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<ImgItem[]>(value);
    const [previewUrls, setPreviewUrls] = useState<(string | undefined)[]>([]);

    // Sincronizar images con value (para edit mode)
    useEffect(() => {
        setImages(value || []);
    }, [value]);

    // Generar URLs de previsualización con efecto (igual que useFilePreview)
    useEffect(() => {
        const urls = images.map((img) => {
            if (img.file) {
                return URL.createObjectURL(img.file);
            }
            return img.url;
        });

        const blobUrls = urls.filter((u): u is string => typeof u === 'string' && u.startsWith('blob:'));

        setPreviewUrls(urls);

        // Cleanup: revocar blob URLs al salir o al cambiar images
        return () => {
            blobUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);


    const sync = (imgs: ImgItem[]) => {
        setImages(imgs);
        onChange?.(imgs as T[]);
    };

    const imageCount = images.filter(i => !i._deleted).length;

    // ➕ agregar nuevas
    const handleSelectImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const disponibles = MAX_IMAGES - imageCount;

        const nuevas: ImgItem[] = Array.from(e.target.files)
            .slice(0, disponibles)
            .map((file, i) => ({
                file,
                orden: images.length + i + 1,
                isPrincipal: imageCount === 0 && i === 0,
            }));

        sync([...images, ...nuevas]);
        e.target.value = "";
    }, [images, imageCount]);

    // 🗑 eliminar (soft delete)
    const removeImage = useCallback(async (index: number) => {
        const img = images[index];

        // 🔥 Si existe en BD → delegar al padre
        if (img.id && onDeleteImage) {
            await onDeleteImage(img as T);
        }

        // eliminar del estado (frontend)
        const updated = images
            .filter((_, i) => i !== index)
            .map((img, i) => ({
                ...img,
                orden: i + 1,
                isPrincipal: i === 0,
            }));

        sync(updated);
    }, [images, onDeleteImage]);

    // ⭐ principal
    const setPrincipal = useCallback(async (index: number) => {
        const img = images[index];

        // 🔥 si existe en BD → backend
        if (img.id && onIsPrincipal) {
            await onIsPrincipal(img as T);
        }

        // 🔥 actualizar frontend visual inmediato
        const updated = images.map((i, idx) => ({
            ...i,
            isPrincipal: idx === index,
        }));

        sync(updated);
    }, [images, onIsPrincipal]);


    return (
        <section className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                    <div key={img.id ?? `new-${index}`} className="relative aspect-square border border-border cursor-pointer group overflow-hidden">
                        {previewUrls[index] ? (
                            <img
                                src={previewUrls[index]}
                                alt={`Imagen ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                                Sin imagen
                            </div>
                        )}

                        {img.isPrincipal && (
                            <span className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                                Principal
                            </span>
                        )}

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 items-center justify-center rounded-md">
                            <Button type="button" size="icon" className="h-8 w-8" onClick={() => setPrincipal(index)}>
                                <Icon icon="lucide:star" className="text-sm" />
                            </Button>

                            <Button type="button" size="icon" variant="destructive" className="h-8 w-8" onClick={() => removeImage(index)}>
                                <Icon icon="lucide:trash-2" className="text-sm" />
                            </Button>
                        </div>
                    </div>
                ))}

                {images.length < MAX_IMAGES && (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="relative aspect-square border-2 border-dashed border-border cursor-pointer shadow-xs
                         bg-input flex flex-col gap-2 px-2 font-medium items-center justify-center rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 overflow-hidden"
                    >
                        <Icon icon="lucide:image-plus" className="text-2xl md:text-4xl text-foreground" />
                        <span className="text-foreground text-xs">Agregar </span>
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleSelectImages}
                hidden
            />
        </section>
    );
}