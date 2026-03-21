interface InputFileProps {
    label?: string;
    accept?: string;
    value?: File | null;
    onChange: (file: File | null) => void;
}

export function InputFile({
    label,
    accept = "image/*",
    onChange,
}: InputFileProps) {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium">{label}</label>}

            <input
                type="file"
                accept={accept}
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                className="
                    block w-full text-sm
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:bg-secondary file:text-foreground
                    hover:file:cursor-pointer
                    file:font-medium
                    focus:outline-none
                "
            />
        </div>
    );
}
