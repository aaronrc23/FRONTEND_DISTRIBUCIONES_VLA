import { useFilePreview } from "../../../hooks/useFilePreview";

interface FrImagePreviewProps {
    file?: File | null;
    size?: number; // px
}

export function FrImagePreview({
    file,
    size = 160,
}: FrImagePreviewProps) {
    const preview = useFilePreview(file);

    if (!preview) return null;

    return (
        <div className="mt-2 flex flex-col items-center">
            <p className="text-sm text-muted-foreground font-semibold mb-1">
                Vista previa
            </p>

            <img
                src={preview}
                alt="preview"
                style={{ width: size, height: size }}
                className="rounded-xl border object-cover shadow-sm"
            />
        </div>
    );
}
