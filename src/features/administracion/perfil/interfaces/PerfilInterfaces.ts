// ──────────────────────────────────────────────
// Interfaces para la respuesta de la API /empleado/perfil
// ──────────────────────────────────────────────

export interface UserProfile {
    id: number;
    user_id: number;
    name: string;
    apellidos: string;
    photo: string | null;
    direccion: string | null;
    dni: string | null;
    telefono: string | null;
    genero: string | null;
    codigo_postal: string | null;
    referencia: string | null;
    departamento: string | null;
    provincia: string | null;
    distrito: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserData {
    id: number;
    email: string;
    email_verified_at: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    profile: UserProfile;
}

export interface PerfilEmpleado {
    id: number;
    user_id: number;
    phone: string | null;
    dni: string | null;
    direccion: string | null;
    empresa_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    user: UserData;
}

// Datos planos para el frontend (cómo queremos consumirlos)
export interface PerfilData {
    name: string;
    apellidos: string;
    email: string;
    phone: string | null;
    dni: string | null;
    direccion: string | null;
    avatar: string | null;
    genero: string | null;
}
