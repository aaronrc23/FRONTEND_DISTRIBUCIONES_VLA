import { useGetFooter, useFooterMutation } from "../../common/hooks/useCrudFooter";
import { FormProvider, useForm, useFieldArray, useWatch } from "react-hook-form";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { Button } from "@/shared/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { AlertCircle, Link2, Eye, Save, Plus, Trash2, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LytFooterConfig() {
    const { data: footerData, isLoading, isError } = useGetFooter();
    const { UpdateFooterLinksMut } = useFooterMutation();
    const [activeTab, setActiveTab] = useState("links");
    const navigate = useNavigate();

    // Datos de la empresa para la preview (solo lectura)
    const [empresaData, setEmpresaData] = useState<any>({});

    // Formulario de links del footer
    const linksMethods = useForm({
        defaultValues: {
            id: 1,
            footer_links: {
                tienda: [] as { label: string; href: string }[],
                ayuda: [] as { label: string; href: string }[],
            },
        },
    });

    const watchedLinks = useWatch({ control: linksMethods.control });

    const tiendaArray = useFieldArray({
        control: linksMethods.control,
        name: "footer_links.tienda",
    });

    const ayudaArray = useFieldArray({
        control: linksMethods.control,
        name: "footer_links.ayuda",
    });

    useEffect(() => {
        if (footerData) {
            const data = Array.isArray(footerData) ? footerData[0] : footerData;

            // Guardar datos de empresa para preview
            setEmpresaData(data);

            if (data.footer_links) {
                const links = typeof data.footer_links === "string"
                    ? JSON.parse(data.footer_links)
                    : data.footer_links;
                linksMethods.reset({
                    id: data.id ?? 1,
                    footer_links: {
                        tienda: links?.tienda ?? [],
                        ayuda: links?.ayuda ?? [],
                    },
                });
            }
        }
    }, [footerData, linksMethods]);

    const onSubmitLinks = async (data: any) => {
        const isConfirm = await showConfirmation(
            "Guardar links del footer",
            "¿Estás seguro de guardar los cambios?"
        );
        if (!isConfirm) return;
        UpdateFooterLinksMut.mutate(data);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground font-medium">Cargando configuración...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-red-500 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <p className="text-base font-semibold">Error al cargar la configuración</p>
                <p className="text-sm text-muted-foreground">Intenta recargar la página</p>
                <Button variant="secondary" onClick={() => window.location.reload()} className="mt-2 cursor-pointer">
                    <Icon icon="mdi:refresh" className="text-lg" />
                    Recargar
                </Button>
            </div>
        );
    }

    return (
        <div className="h-full w-full max-w-6xl mx-auto px-4 md:px-6 py-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Icon icon="mdi:page-layout-footer" className="text-primary-foreground text-2xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Configuración del Footer</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Administra los enlaces de navegación del pie de página</p>
                </div>
            </div>

            {/* Aviso: datos de empresa */}
            <div className="bg-info-20 border border-info-20/50 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-info-20 flex items-center justify-center shrink-0">
                    <Icon icon="mdi:information-outline" className="text-textinfo-20 text-lg" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-textinfo-20">
                        Los datos de la empresa se gestionan desde otro módulo
                    </p>
                    <p className="text-xs text-textinfo-20/80 mt-0.5">
                        Para editar razón social, contacto, redes sociales y copyright, ve a la configuración de la empresa.
                    </p>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/panel/empresa")}
                    className="cursor-pointer shrink-0"
                >
                    Ir a Empresa
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList variant="bordered" className="w-full mb-8">
                    <TabsTrigger value="links" className="flex items-center gap-2 px-5 py-2.5">
                        <Link2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Links</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2 px-5 py-2.5">
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Vista Previa</span>
                    </TabsTrigger>
                </TabsList>

                {/* ========== TAB: LINKS ========== */}
                <TabsContent value="links">
                    <FormProvider {...linksMethods}>
                        <form onSubmit={linksMethods.handleSubmit(onSubmitLinks)}>
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Link2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-foreground">Links de Navegación</h2>
                                            <p className="text-xs text-muted-foreground">Enlaces que aparecen en las columnas del footer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-8">
                                    {/* Sección Tienda */}
                                    <SectionLinks
                                        title="Sección Tienda"
                                        subtitle="Enlaces de productos y categorías"
                                        icon="mdi:store"
                                        color="blue"
                                        fields={tiendaArray.fields}
                                        append={() => tiendaArray.append({ label: "", href: "" })}
                                        remove={tiendaArray.remove}
                                        control={linksMethods.control}
                                        namePrefix="footer_links.tienda"
                                    />

                                    {/* Sección Ayuda */}
                                    <SectionLinks
                                        title="Sección Ayuda"
                                        subtitle="Enlaces de soporte y políticas"
                                        icon="mdi:lifebuoy"
                                        color="emerald"
                                        fields={ayudaArray.fields}
                                        append={() => ayudaArray.append({ label: "", href: "" })}
                                        remove={ayudaArray.remove}
                                        control={linksMethods.control}
                                        namePrefix="footer_links.ayuda"
                                    />
                                </div>

                                {/* Footer actions */}
                                <div className="px-6 py-4 bg-muted/50 border-t border-border flex justify-end">
                                    <Button type="submit" className="cursor-pointer">
                                        <Save className="w-4 h-4" />
                                        Guardar Links
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </TabsContent>

                {/* ========== TAB: VISTA PREVIA ========== */}
                <TabsContent value="preview">
                    <FooterPreview
                        empresa={empresaData}
                        links={watchedLinks.footer_links}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

/* ===== COMPONENTE DE SECCIÓN DE LINKS ===== */
function SectionLinks({
    title,
    subtitle,
    icon,
    color,
    fields,
    append,
    remove,
    control,
    namePrefix,
}: {
    title: string;
    subtitle: string;
    icon: string;
    color: "blue" | "emerald";
    fields: any[];
    append: () => void;
    remove: (index: number) => void;
    control: any;
    namePrefix: string;
}) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-700",
        emerald: "bg-emerald-100 text-emerald-700",
    };

    const emptyBg = {
        blue: "bg-blue-50",
        emerald: "bg-emerald-50",
    };

    return (
        <div>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
                        <Icon icon={icon} className="text-lg" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={append}
                    className="cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Agregar
                </Button>
            </div>

            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="group flex items-start gap-3 p-4 bg-muted rounded-xl border border-border hover:border-border/80 transition-all"
                    >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FrInput
                                type="text"
                                control={control}
                                label="Etiqueta"
                                name={`${namePrefix}.${index}.label`}
                                placeholder="Ej: Todos los productos"
                            />
                            <FrInput
                                type="text"
                                control={control}
                                label="URL"
                                name={`${namePrefix}.${index}.href`}
                                placeholder="Ej: /catalogo"
                                leftIcon="mdi:link-variant"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="mt-6 p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            title="Eliminar link"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className={`flex flex-col items-center justify-center py-10 ${emptyBg[color]} rounded-xl border-2 border-dashed border-border`}>
                        <Icon icon={icon} className="text-3xl text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground font-medium">No hay links en esta sección</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">Haz clic en "Agregar" para añadir uno</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ===== COMPONENTE DE VISTA PREVIA ===== */
function FooterPreview({ empresa, links }: { empresa: any; links: any }) {
    const v = empresa || {};
    const tiendaLinks = links?.tienda ?? [];
    const ayudaLinks = links?.ayuda ?? [];

    const direccionCompleta = [v.direccion, v.distrito, v.provincia, v.departamento].filter(Boolean).join(", ");

    const socialLinks = [
        ...(v.facebook_url ? [{ icon: "mdi:facebook", label: "Facebook", href: v.facebook_url }] : []),
        ...(v.instagram_url ? [{ icon: "mdi:instagram", label: "Instagram", href: v.instagram_url }] : []),
        ...(v.twitter_url ? [{ icon: "ri:twitter-x-fill", label: "X (Twitter)", href: v.twitter_url }] : []),
    ];

    return (            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-accent/50 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                            <Eye className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-foreground">Vista Previa del Footer</h2>
                            <p className="text-xs text-muted-foreground">Así se verá el footer en tu tienda con la configuración actual</p>
                        </div>
                    </div>
                </div>

                {/* Simulación del footer */}
                <div className="p-6">
                    <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
                        <footer className="bg-card">
                        <div className="max-w-4xl mx-auto px-6 py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                                {/* Marca */}
                                <div className="lg:col-span-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                                            <Icon icon="mdi:package-variant-closed" className="text-white text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-foreground">{v.nombre_comercial || "Mi Tienda"}</h3>
                                        </div>
                                    </div>                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {v.descripcion || "Descripción de la empresa..."}
                    </p>
                                    {socialLinks.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            {socialLinks.map((s) => (
                                                <div key={s.label} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                                    <Icon icon={s.icon} className="text-sm text-muted-foreground" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Tienda links */}
                                {tiendaLinks.length > 0 && (
                                    <div className="lg:col-span-3 flex flex-col gap-3">
                                        <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider">Tienda</h4>
                                        <div className="w-6 h-[2px] bg-primary rounded-full" />
                                        <ul className="flex flex-col gap-2">
                                            {tiendaLinks.map((link: any, i: number) => (
                                                <li key={i}>
                                                    <span className="text-xs text-muted-foreground">{link.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Ayuda links */}
                                {ayudaLinks.length > 0 && (
                                    <div className="lg:col-span-2 flex flex-col gap-3">
                                        <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider">Ayuda</h4>
                                        <div className="w-6 h-[2px] bg-primary rounded-full" />
                                        <ul className="flex flex-col gap-2">
                                            {ayudaLinks.map((link: any, i: number) => (
                                                <li key={i}>
                                                    <span className="text-xs text-muted-foreground">{link.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Contacto */}
                                <div className="lg:col-span-3 flex flex-col gap-3">                                        <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider">Contacto</h4>
                                    <div className="w-6 h-[2px] bg-primary rounded-full" />
                                    <ul className="flex flex-col gap-3">
                                        {direccionCompleta && (
                                            <li className="flex items-start gap-2.5">
                                                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                                <span className="text-xs text-muted-foreground">{direccionCompleta}</span>
                                            </li>
                                        )}
                                        {v.telefono && (
                                            <li className="flex items-center gap-2.5">
                                                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                                                <span className="text-xs text-muted-foreground">{v.telefono}</span>
                                            </li>
                                        )}
                                        {v.email && (
                                            <li className="flex items-center gap-2.5">
                                                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                                                <span className="text-xs text-muted-foreground">{v.email}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Barra inferior */}
                        <div className="border-t border-border bg-muted">
                            <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                                <p className="text-[11px] text-muted-foreground">
                                    {v.copyright_text || `© ${new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.`}
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                    <Icon icon="mdi:information-outline" className="inline mr-1" />
                    La vista previa se actualiza automáticamente
                </p>
            </div>
        </div>
    );
}
