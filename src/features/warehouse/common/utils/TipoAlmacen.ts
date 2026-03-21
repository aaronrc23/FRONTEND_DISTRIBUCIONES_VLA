export const TipoInvEnum = {
    FISICO: 'FISICO',
    VIRTUAL: 'VIRTUAL'
} as const

export type TipoInvEnum = (typeof TipoInvEnum)[keyof typeof TipoInvEnum];


