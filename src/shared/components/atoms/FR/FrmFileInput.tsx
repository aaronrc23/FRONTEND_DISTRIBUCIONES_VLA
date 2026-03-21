
import { Controller } from "react-hook-form";
import { InputFile } from "../../../ui/inputfile";


interface FrFileInputProps {
    name: string;
    label?: string;
    control: any;
    accept?: string;
}

export function FrFileInput({
    name,
    label,
    control,
}: FrFileInputProps) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputFile
                    label={label}
                    accept="image/*"
                    onChange={field.onChange}
                />
            )}
        />
    );
}
