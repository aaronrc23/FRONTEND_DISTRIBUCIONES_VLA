
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Texto, Button } from '../../../../shared/ui';
import { loginSchemaPanel, type LoginFormValuesPanel } from '../../hooks/validation/loginschema';
import { useAccionAuth } from '../../hooks/useAccionAuth';
import { FrInput } from '../../../../shared/components/atoms/FR/FrInput';

export default function FrmLogin() {
    const forms = useForm<LoginFormValuesPanel>({
        resolver: zodResolver(loginSchemaPanel),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { panelloginmutate } = useAccionAuth();

    const onSubmit = async (data: LoginFormValuesPanel) => {
        return await panelloginmutate.mutateAsync(data);
    };

    return (
        <form className="space-y-5  px-8 md:px-0 w-full" onSubmit={forms.handleSubmit(onSubmit)}>
            {/* Email */}
            <FrInput
                name="email"
                control={forms.control}
                label="Correo corporativo"
                leftIcon="mdi:email-outline"
                inputSize="lg"
            />
            {/* Password */}
            <FrInput
                type='password'
                name="password"
                control={forms.control}
                label="Contraseña"
                leftIcon="mdi:lock-outline"
                inputSize="lg"
                required
            />


            {/* Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-5">
                <Texto variant="mutedmin" >
                    Acceso exclusivo para empleados
                </Texto>
                <button
                    type="button"
                    className="text-white/80 hover:underline"
                >
                    ¿Problemas de acceso?
                </button>
            </div>
            {/* Button */}
            <Button type='submit' variant={"success"} aria-label="Ingresar" className='w-full cursor-pointer rounded-2xl ' size={'xl'} onClick={forms.handleSubmit(onSubmit)}>
                Acceder al Sistema
            </Button>
        </form>
    )
}
