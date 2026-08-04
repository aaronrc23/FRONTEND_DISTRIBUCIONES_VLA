import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { Button } from "@/shared/ui";
import { perfilSchema, type PerfilFormValues } from "../../libs/PerfilSchema";
import { usePerfil } from "@/features/administracion/common/hooks/useCrudPerfil";
import { updatePerfil } from "../../services/PerfilService";
import { showSuccess, showError, showConfirmation } from "@/shared/hooks/useSwalert";
import { useQueryClient } from "@tanstack/react-query";

interface FrmInfoPersonalProps {
    onSuccess?: () => void;
}

export default function FrmInfoPersonal({ onSuccess }: FrmInfoPersonalProps) {
    const { data: profile, isLoading } = usePerfil();
    const queryClient = useQueryClient();

    const forms = useForm<PerfilFormValues>({
        resolver: zodResolver(perfilSchema),
        defaultValues: {
            name: "",
            apellidos: "",
            email: "",
            phone: "",
        },
    });

    // Sincronizar datos del perfil cuando se cargan
    useEffect(() => {
        if (profile) {
            forms.reset({
                name: profile.name || "",
                apellidos: profile.apellidos || "",
                email: profile.email || "",
                phone: profile.phone || "",
            });
        }
    }, [profile]);

    const onSubmit = async (data: PerfilFormValues) => {
        const confirm = await showConfirmation(
            "Guardar cambios",
            "¿Estás seguro de guardar los cambios en tu perfil?"
        );
        if (!confirm) return;

        try {
            const payload: Record<string, any> = {
                name: data.name,
                apellidos: data.apellidos,
                phone: data.phone,
            };

            if (data.email !== profile?.email) {
                payload.email = data.email;
            }

            await updatePerfil(payload);
            queryClient.invalidateQueries({ queryKey: ["perfil"] });
            showSuccess("Perfil actualizado", "Tus datos se han guardado correctamente.");
            onSuccess?.();
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "No se pudieron guardar los cambios.";
            showError("Error", message);
        }
    };

    return (
        <form
            onSubmit={forms.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 px-2"
        >
            <div className="flex flex-col sm:flex-row gap-4">
                <FrInput
                    label="Nombre"
                    name="name"
                    control={forms.control}
                    leftIcon="mdi:account"
                    placeholder="Tu nombre"
                />
                <FrInput
                    label="Apellidos"
                    name="apellidos"
                    control={forms.control}
                    leftIcon="mdi:account"
                    placeholder="Tus apellidos"
                />
            </div>

            <FrInput
                label="Correo Electrónico"
                name="email"
                type="email"
                control={forms.control}
                leftIcon="eva:email-outline"
                placeholder="correo@ejemplo.com"
            />

            <FrInput
                label="Teléfono"
                name="phone"
                type="tel"
                control={forms.control}
                leftIcon="mdi:phone"
                placeholder="999 999 999"
            />

            <div className="w-full mt-2">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    size="lg"
                    disabled={isLoading}
                >
                    Guardar cambios
                </Button>
            </div>
        </form>
    );
}
