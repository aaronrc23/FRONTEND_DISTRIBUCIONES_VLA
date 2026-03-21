import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../../../shared/ui';
import { Icon } from '@iconify-icon/react';

const MAX_IMAGES = 7;

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

    useEffect(() => {
        setImages(value || []);
    }, [value]);


    const sync = (imgs: ImgItem[]) => {
        setImages(imgs);
        onChange?.(imgs as T[]);
    };

    // ➕ agregar nuevas
    const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const disponibles = MAX_IMAGES - images.filter(i => !i._deleted).length;

        const nuevas: ImgItem[] = Array.from(e.target.files)
            .slice(0, disponibles)
            .map((file, i) => ({
                file,
                orden: images.length + i + 1,
                isPrincipal: images.length === 0 && i === 0,
            }));

        sync([...images, ...nuevas]);
        e.target.value = "";
    };

    // 🗑 eliminar (soft delete)
    const removeImage = async (index: number) => {
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
    };

    // ⭐ principal
    const setPrincipal = async (index: number) => {
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
    };


    return (
        <section className="space-y-3">
            <h3 className="text-sm font-semibold">Imágenes</h3>

            <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                    <div key={index} className="relative aspect-square border cursor-pointer">
                        <img
                            src={img.file
                                ? URL.createObjectURL(img.file)
                                : img.url}
                            className="w-32 h-32 object-cover"
                        />

                        {img.isPrincipal && (
                            <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                                Principal
                            </span>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex gap-2 items-center justify-center">
                            <Button type="button" size="icon" onClick={() => setPrincipal(index)}>
                                <Icon icon="lucide:star" />
                            </Button>

                            <Button type="button" size="icon" variant="destructive" onClick={() => removeImage(index)}>
                                <Icon icon="lucide:trash-2" />
                            </Button>
                        </div>
                    </div>
                ))}

                {images.length < MAX_IMAGES && (
                    <div onClick={() => inputRef.current?.click()}
                        className="relative aspect-square border cursor-pointer shadow-xs
                         bg-input flex flex-col gap-2 px-2 font-medium items-center justify-center rounded-lg">
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
