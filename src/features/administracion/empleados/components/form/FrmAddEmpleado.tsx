
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FrInput } from "../../../../../shared/components/atoms/FR/FrInput";
import { Button } from "../../../../../shared/ui";
import { AccionesEmpl } from "../../../common/hooks/useCrudEmpleados";
import { empleadosSchema, type EmpleadosFormValues } from "../../../common/libs/EmpleadosSchema";



export default function FrmAddEmpleado() {
    const forms = useForm<EmpleadosFormValues>({
        resolver: zodResolver(empleadosSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            apellidos: "",
            direccion: "",
            phone: "",
            dni: "",
            genero: "",
            sucursal_id: "",

        },
    });

    const { handleAdd } = AccionesEmpl();
    const onSubmit = (data: EmpleadosFormValues) => {
        handleAdd(data);
    };

    return (
        <form
            onSubmit={forms.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-5 px-1 "
        >

            {/* Datos personales */}
            <FrInput
                label="Nombre"
                name="name"
                control={forms.control}
            />

            <FrInput
                label="Apellidos"
                name="apellidos"
                control={forms.control}
            />

            <div className="flex flex-col  xs:flex-row gap-4">
                <FrInput
                    type="number"
                    label="DNI"
                    name="dni"
                    control={forms.control}
                />

                <FrInput
                    type="tel"
                    label="Teléfono"
                    name="phone"
                    control={forms.control}
                />
            </div>


            <FrInput
                label="Género"
                name="genero"
                control={forms.control}
            />

            {/* Dirección */}
            <FrInput
                label="Dirección"
                name="direccion"
                leftIcon="tabler:map-pin"
                control={forms.control}
            />
          
            {/* Datos de acceso */}
            <FrInput
                label="Correo Electrónico"
                name="email"
                type="email"
                leftIcon="eva:email-outline"
                control={forms.control}
            />

            <FrInput
                label="Contraseña"
                name="password"
                type="password"
                leftIcon="eva:lock-outline"
                control={forms.control}
            />



            {/* Botón */}
            <div className="w-full mt-4">
                <Button type="submit" variant="primary" className="w-full" size="lg">
                    Guardar empleado
                </Button>
            </div>
        </form>
    );
}
