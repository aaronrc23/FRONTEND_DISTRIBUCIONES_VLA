import { useEffect, useState } from "react";

type FileSource1 = File | FileList | null | undefined;

export function useFilePreview(fileSource: FileSource1) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        let file: File | null = null;

        if (!fileSource) {
            setPreview(null);
            return;
        }

        if (fileSource instanceof File) {
            file = fileSource;
        } else if (fileSource instanceof FileList && fileSource.length > 0) {
            file = fileSource[0];
        }

        if (!file) {
            setPreview(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [fileSource]);

    return preview;
}







type FileSource = FileList | File[] | null | undefined;

export function useFilePreviews(files: FileSource, max = 4) {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (!files || files.length === 0) {
            setPreviews([]);
            return;
        }

        const selectedFiles = Array.from(files).slice(0, max);

        const urls = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files, max]);

    return previews;
}
