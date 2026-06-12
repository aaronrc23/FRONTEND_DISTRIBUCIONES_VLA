import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { Button } from "@/shared/ui";
import {
    cambiarPasswordSchema,
    type CambiarPasswordFormValues,
} from "../../libs/PerfilSchema";
import { cambiarPassword } from "../../services/PerfilService";
import { showSuccess, showError, showConfirmation } from "@/shared/hooks/useSwalert";

export default function FrmCambiarPassword() {
    const forms = useForm<CambiarPasswordFormValues>({
        resolver: zodResolver(cambiarPasswordSchema),
        defaultValues: {
            password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    });

    
    

    const onSubmit = async (data: CambiarPasswordFormValues) => {
        const confirm = await showConfirmation(
            "Cambiar contraseña",
            "¿Estás seguro de cambiar tu contraseña?"
        );
        if (!confirm) return;

        try {
            await cambiarPassword({
                password: data.password,
                new_password: data.new_password,
                new_password_confirmation: data.new_password_confirmation,
            });

            showSuccess(
                "Contraseña actualizada",
                "Tu contraseña se ha cambiado correctamente."
            );
            forms.reset();
        } catch (error: any) {
            showError(
                "Error",
                error?.response?.data?.message || "No se pudo cambiar la contraseña."
            );
        }
    };

    return (
        <form
            onSubmit={forms.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-2"
        >
            <FrInput
                label="Contraseña actual"
                name="password"
                type="password"
                control={forms.control}
                leftIcon="eva:lock-outline"
                placeholder="Ingresa tu contraseña actual"
            />

            <FrInput
                label="Nueva contraseña"
                name="new_password"
                type="password"
                control={forms.control}
                leftIcon="eva:lock-outline"
                placeholder="Mínimo 6 caracteres"
            />

            <FrInput
                label="Confirmar nueva contraseña"
                name="new_password_confirmation"
                type="password"
                control={forms.control}
                leftIcon="eva:lock-outline"
                placeholder="Repite la nueva contraseña"
            />

            <div className="w-full mt-2">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    size="lg"
                >
                    Cambiar contraseña
                </Button>
            </div>
        </form>
    );
}
