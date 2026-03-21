


import { useEffect, useMemo } from "react";
import { showConfirmation } from "../../../../../shared/hooks/useSwalert";
import { Button } from "../../../../../shared/ui";
import { listPermisos, listUserPermisos, useModificarPermisos } from "../../../common/hooks/useCrudAssignacion";
import { useMultiSelect } from "../../../../../shared/hooks/useMultiselect";
import { ActionCard } from "../ActionCard";


interface FrmAddPermisosProps {
    datos: any;
    onClose: () => void;
}

const permisoConfig = (name: string) => {
    if (name.includes("ver")) {
        return { label: "Ver", icon: "lucide:eye" };
    }
    if (name.includes("crear")) {
        return { label: "Crear", icon: "lucide:plus-circle" };
    }
    if (name.includes("editar")) {
        return { label: "Editar", icon: "lucide:pencil" };
    }
    if (name.includes("eliminar")) {
        return { label: "Eliminar", icon: "lucide:trash-2" };
    }

    return { label: "Acción", icon: "lucide:shield" };
};


export default function FrmAddPermisos({ datos, onClose }: FrmAddPermisosProps) {
    const { data: permisos = [], isLoading } = listPermisos();
    const { data: permisosUsuario = [] } = listUserPermisos(datos.id);
    const { values: selected, toggle, setAll } = useMultiSelect<number>();
    const { mutate: mutatePermisos } = useModificarPermisos(datos.id);



    /* 👉 precargar permisos del usuario */
    useEffect(() => {
        if (!permisos.length || !permisosUsuario.length) return;

        const idsAsignados = permisos
            .filter((permiso: any) =>
                permisosUsuario.includes(permiso.name)
            )
            .map((permiso: any) => permiso.id);

        setAll(idsAsignados);

        // 👇 quitamos permisos del dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permisosUsuario]);


    /* 👉 agrupar permisos por módulo */
    const permisosPorModulo = useMemo(() => {
        return permisos.reduce((acc: any, permiso: any) => {
            const modulo = permiso.name.split(" ")[1] || "otros";
            if (!acc[modulo]) acc[modulo] = [];
            acc[modulo].push(permiso);
            return acc;
        }, {});
    }, [permisos]);



    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const confirm = await showConfirmation(
            "Confirmar",
            "¿Estas seguro de guardar los permisos?"
        );

        if (!confirm) return;

        // 👉 convertir IDs seleccionados a nombres
        const permissionNames = permisos
            .filter((permiso: any) => selected.includes(permiso.id))
            .map((permiso: any) => permiso.name);

        mutatePermisos(permissionNames);
    };



    if (isLoading) return <p className="text-sm text-muted-foreground">Cargando permisos...</p>;

    return (
        <form className="flex flex-col gap-6 py-3" onSubmit={onSubmit}>



            {/* Contenido scroll (ideal para drawer) */}
            <div className="flex flex-col gap-4  pr-1">
                {Object.entries(permisosPorModulo).map(([modulo, perms]: any) => (
                    <div
                        key={modulo}
                        className="rounded-xl  bg-card p-4 shadow-xs"
                    >
                        <h3 className="mb-3 text-sm font-semibold capitalize">
                            Módulo {modulo}
                        </h3>

                        <div
                            className="
                            -mx-4 px-4
                            flex gap-3 overflow-x-auto
                            flex-wrap sm:overflow-visible"
                        >
                            {perms.map((permiso: any) => {
                                const checked = selected.includes(permiso.id);
                                const { label, icon } = permisoConfig(permiso.name);

                                return (
                                    <ActionCard
                                        key={permiso.id}
                                        label={label}
                                        icon={icon}
                                        checked={checked}
                                        onToggle={() => toggle(permiso.id)}
                                    />
                                );
                            })}
                        </div>



                    </div>
                ))}
            </div>

            {/* Footer acciones */}
            <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" type="button" onClick={() => onClose()}>Cancelar</Button>
                <Button type="submit">Guardar permisos</Button>
            </div>
        </form>
    );
}
