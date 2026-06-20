import { useGetEmpresa, useEmpresaMutation } from "../../common/hooks/useCrudEmpresa";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FrInput } from "@/shared/components/atoms/FR/FrInput";
import { Button } from "@/shared/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { showConfirmation } from "@/shared/hooks/useSwalert";
import { AlertCircle, Building2, Smartphone, Globe, Save, RefreshCw } from "lucide-react";

export default function LytEmpresa() {
    const { data: empresaData, isLoading, isError } = useGetEmpresa();
    const { UpdateEmpresaMut } = useEmpresaMutation();
    const [activeTab, setActiveTab] = useState("empresa");

    const methods = useForm({
        defaultValues: {
            id: 1,
            razon_social: "",
            nombre_comercial: "",
            descripcion: "",
            direccion: "",
            departamento: "",
            provincia: "",
            distrito: "",
            telefono: "",
            email: "",
            facebook_url: "",
            instagram_url: "",
            twitter_url: "",
            whatsapp: "",
            copyright_text: "",
        },
    });

    const watchedValues = useWatch({ control: methods.control });

    useEffect(() => {
        if (empresaData) {
            const data = Array.isArray(empresaData) ? empresaData[0] : empresaData;
            methods.reset({
                id: data.id ?? 1,
                razon_social: data.razon_social ?? "",
                nombre_comercial: data.nombre_comercial ?? "",
                descripcion: data.descripcion ?? "",
                direccion: data.direccion ?? "",
                departamento: data.departamento ?? "",
                provincia: data.provincia ?? "",
                distrito: data.distrito ?? "",
                telefono: data.telefono ?? "",
                email: data.email ?? "",
                facebook_url: data.facebook_url ?? "",
                instagram_url: data.instagram_url ?? "",
                twitter_url: data.twitter_url ?? "",
                whatsapp: data.whatsapp ?? "",
                copyright_text: data.copyright_text ?? "",
            });
        }
    }, [empresaData, methods]);

    const onSubmit = async (data: any) => {
        const isConfirm = await showConfirmation(
            "Guardar datos de la empresa",
            "¿Estás seguro de guardar los cambios?"
        );
        if (!isConfirm) return;
        UpdateEmpresaMut.mutate(data);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-900 border-t-transparent" />
                    <p className="text-sm text-slate-500 font-medium">Cargando datos de la empresa...</p>
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
                <p className="text-base font-semibold">Error al cargar los datos</p>
                <p className="text-sm text-slate-400">Intenta recargar la página</p>
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
                    <Building2 className="text-primary-foreground text-2xl" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Configuración de la Empresa</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Administra la información principal de tu negocio
                    </p>
                </div>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList variant="bordered" className="w-full mb-8">
                            <TabsTrigger value="empresa" className="flex items-center gap-2 px-5 py-2.5">
                                <Building2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Datos Generales</span>
                            </TabsTrigger>
                            <TabsTrigger value="contacto" className="flex items-center gap-2 px-5 py-2.5">
                                <Smartphone className="w-4 h-4" />
                                <span className="hidden sm:inline">Contacto & Redes</span>
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="flex items-center gap-2 px-5 py-2.5">
                                <Globe className="w-4 h-4" />
                                <span className="hidden sm:inline">Vista Previa</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* ========== TAB: DATOS GENERALES ========== */}
                        <TabsContent value="empresa">
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-foreground">Información Principal</h2>
                                            <p className="text-xs text-muted-foreground">Datos que identifican tu negocio</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Razón Social"
                                            name="razon_social"
                                            placeholder="Distribuciones VLA E.I.R.L."
                                            leftIcon="mdi:domain"
                                        />
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Nombre Comercial"
                                            name="nombre_comercial"
                                            placeholder="Distribuciones VLA"
                                            leftIcon="mdi:store"
                                        />
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-medium text-slate-700 block mb-1.5 ml-1">
                                                Descripción
                                            </label>
                                            <textarea
                                                {...methods.register("descripcion")}
                                                rows={3}
                                                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all resize-none"
                                                placeholder="Tu tienda de confianza con los mejores productos al mejor precio."
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Texto de Copyright"
                                            name="copyright_text"
                                            placeholder="© 2026 Distribuciones VLA E.I.R.L. Todos los derechos reservados."
                                            leftIcon="mdi:copyright"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ========== TAB: CONTACTO & REDES ========== */}
                        <TabsContent value="contacto">
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                                {/* Contacto */}
                                <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Smartphone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-foreground">Información de Contacto</h2>
                                            <p className="text-xs text-muted-foreground">Dirección, teléfono y email</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Dirección"
                                            name="direccion"
                                            placeholder="Av. Principal 123"
                                            leftIcon="mdi:map-marker"
                                        />
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Departamento"
                                            name="departamento"
                                            placeholder="Lima"
                                        />
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Provincia"
                                            name="provincia"
                                            placeholder="Lima"
                                        />
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Distrito"
                                            name="distrito"
                                            placeholder="Miraflores"
                                        />
                                        <FrInput
                                            type="text"
                                            control={methods.control}
                                            label="Teléfono"
                                            name="telefono"
                                            placeholder="+51 999 999 999"
                                            leftIcon="mdi:phone"
                                        />
                                        <FrInput
                                            type="email"
                                            control={methods.control}
                                            label="Email"
                                            name="email"
                                            placeholder="contacto@vla.com"
                                            leftIcon="mdi:email"
                                        />
                                    </div>
                                </div>

                                {/* Redes Sociales */}
                                <div className="border-t border-border">
                                    <div className="px-6 py-5 bg-gradient-to-r from-accent/50 to-transparent border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                                                <Globe className="w-5 h-5 text-accent-foreground" />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold text-foreground">Redes Sociales</h2>
                                                <p className="text-xs text-muted-foreground">Enlaces a tus perfiles sociales</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FrInput
                                                type="url"
                                                control={methods.control}
                                                label="Facebook"
                                                name="facebook_url"
                                                placeholder="https://facebook.com/tutienda"
                                                leftIcon="mdi:facebook"
                                            />
                                            <FrInput
                                                type="url"
                                                control={methods.control}
                                                label="Instagram"
                                                name="instagram_url"
                                                placeholder="https://instagram.com/tutienda"
                                                leftIcon="mdi:instagram"
                                            />
                                            <FrInput
                                                type="url"
                                                control={methods.control}
                                                label="Twitter / X"
                                                name="twitter_url"
                                                placeholder="https://twitter.com/tutienda"
                                                leftIcon="ri:twitter-x-fill"
                                            />
                                            <FrInput
                                                type="text"
                                                control={methods.control}
                                                label="WhatsApp"
                                                name="whatsapp"
                                                placeholder="51999999999"
                                                leftIcon="mdi:whatsapp"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ========== TAB: VISTA PREVIA ========== */}
                        <TabsContent value="preview">
                            <EmpresaPreview values={watchedValues} />
                        </TabsContent>
                    </Tabs>

                    {/* Botón guardar global */}
                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => methods.reset()}
                            className="cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Restablecer
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                            <Save className="w-4 h-4" />
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

/* ===== VISTA PREVIA ===== */
function EmpresaPreview({ values }: { values: any }) {
    const v = values || {};

    const socialLinks = [
        ...(v.facebook_url ? [{ icon: "mdi:facebook", label: "Facebook", href: v.facebook_url }] : []),
        ...(v.instagram_url ? [{ icon: "mdi:instagram", label: "Instagram", href: v.instagram_url }] : []),
        ...(v.twitter_url ? [{ icon: "ri:twitter-x-fill", label: "X (Twitter)", href: v.twitter_url }] : []),
    ];

    const direccionCompleta = [v.direccion, v.distrito, v.provincia, v.departamento].filter(Boolean).join(", ");

    return (            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-accent/50 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                            <Globe className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-foreground">Vista Previa</h2>
                            <p className="text-xs text-muted-foreground">Así se verán los datos en la tienda</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-card p-6">
                            {/* Header con logo y nombre */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                                    <Icon icon="mdi:package-variant-closed" className="text-primary-foreground text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{v.nombre_comercial || "Mi Tienda"}</h3>
                                    <p className="text-sm text-muted-foreground">{v.razon_social || "Razón Social"}</p>
                                </div>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                {v.descripcion || "Descripción de la empresa..."}
                            </p>

                            {/* Información de contacto */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {direccionCompleta && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                                        <Icon icon="mdi:map-marker" className="text-primary text-lg shrink-0" />
                                        <span className="text-sm text-foreground/70">{direccionCompleta}</span>
                                    </div>
                                )}
                                {v.telefono && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                                        <Icon icon="mdi:phone" className="text-primary text-lg shrink-0" />
                                        <span className="text-sm text-foreground/70">{v.telefono}</span>
                                    </div>
                                )}
                                {v.email && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                                        <Icon icon="mdi:email" className="text-primary text-lg shrink-0" />
                                        <span className="text-sm text-foreground/70">{v.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Redes sociales */}
                            {socialLinks.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Redes Sociales</h4>
                                    <div className="flex items-center gap-3">
                                        {socialLinks.map((s) => (
                                            <div key={s.label} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                <Icon icon={s.icon} className="text-lg text-muted-foreground" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Copyright */}
                            {v.copyright_text && (
                                <div className="pt-4 border-t border-border">
                                    <p className="text-xs text-muted-foreground/60">{v.copyright_text}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                        <Icon icon="mdi:information-outline" className="inline mr-1" />
                        Esta vista previa se actualiza automáticamente
                    </p>
                </div>
            </div>
    );
}
