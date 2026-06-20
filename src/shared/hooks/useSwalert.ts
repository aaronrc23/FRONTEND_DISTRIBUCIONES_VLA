import Swal, { type SweetAlertIcon } from "sweetalert2";
export const showSuccess = (
    title = "Éxito",
    text = "",
    detail?: string
) => {
    Swal.fire({
        title,
        text,
        footer: detail ? `<span class="text-gray-500">${detail}</span>` : undefined,
        icon: "success",
        confirmButtonColor: "#10b981",
        confirmButtonText: "Aceptar",
        backdrop: "var(--backdrop)",
        customClass: {
            popup: "swal-custom-text",
            title: "swal-custom-title",
            confirmButton: "swal-confirm-btn",
        },
        buttonsStyling: false,
    });
};



export const showLoading = (
    title = "Cargando",
    text = "Por favor espera..."
) => {
    Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: "var(--backdrop)",
        customClass: {
            popup: "swal-custom-text",
        },
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

// ❌ Alerta de error
export const showError = (title = 'Error', text = '', html?: string) => {
    Swal.fire({
        title,
        text,
        html,
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Aceptar',
        backdrop: "var(--backdrop)",
        buttonsStyling: false,
        customClass: {
            popup: "swal-custom-text",
            confirmButton: 'rounded-xl bg-red-500 text-white px-4 py-2 hover:bg-red-600',
            cancelButton: 'rounded-xl bg-gray-300 text-black px-4 py-2 hover:bg-gray-400',
        },
    });
};

// ⚠️ Alerta de confirmación
export const showConfirmation = async (
    title = '¿Estás seguro?',
    text = '',
    options = {}
): Promise<boolean> => {

    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        backdrop: "var(--backdrop)",
        buttonsStyling: false,
        customClass: {
            popup: "swal-custom-text",
            title: "swal-custom-title",
            confirmButton:
                'rounded-md bg-emerald-500 dark:bg-emerald-600 mr-2 text-white px-4 py-3 font-medium cursor-pointer hover:bg-emerald-600',
            cancelButton:
                'rounded-md bg-rose-500 dark:bg-rose-600 cursor-pointer text-white font-medium px-4 py-3 hover:bg-rose-600',
        },
        ...options,
    });

    return result.isConfirmed;
};


export const showInfo = (title = 'Info', text = '') => {
    Swal.fire({
        title,
        text,
        icon: 'info',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Aceptar',
        backdrop: "var(--backdrop)",
        customClass: {
            popup: "swal-custom-text",
        },
    }
    );
};

export const showErrorWithCancel = (title = 'Error', text = '') => {
    return Swal.fire({
        title,
        text,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        backdrop: "var(--backdrop)",
        customClass: {
            popup: "swal-custom-text",
            confirmButton: 'rounded-xl bg-red-500 text-white px-4 py-2 hover:bg-red-600',
            cancelButton: 'rounded-xl bg-gray-300 text-black px-4 py-2 hover:bg-gray-400',
        }
    });
};

export const showWarning = (title = 'Advertencia', text = '') => {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'Aceptar',
        backdrop: "var(--backdrop)",
        customClass: {
            popup: "swal-custom-text",
        }
    });
}


// 🔔 Toast opcional
export const showToast = (title = '', icon: SweetAlertIcon = 'success') => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "var(--popover)",
        customClass: {
            popup: "swal-custom-text",
            title: "text-sm font-medium",
        }
    });
};


export const showToastError = (title = '', icon: SweetAlertIcon = 'error') => {
    showToast(title, icon);
};

export const showToastSuccess = (title = '', icon: SweetAlertIcon = 'success') => {
    showToast(title, icon);
};

export const showToastWarning = (title = '', icon: SweetAlertIcon = 'warning') => {
    showToast(title, icon);
};
export const showToastInfo = (title = '', icon: SweetAlertIcon = 'info') => {
    showToast(title, icon);
}