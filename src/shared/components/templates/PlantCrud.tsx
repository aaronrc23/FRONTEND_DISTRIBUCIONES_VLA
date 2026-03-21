import { Texto } from "../../ui";
interface PlantCrudProps {
    title?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
}

export default function PlantCrud({ title, header, footer, children }: PlantCrudProps) {
    return (
        <div className='h-full w-full space-y-4 px-0 md:px-4 py-0 sm:py-2'>

            <header className=' flex items-center justify-between flex-col sm:flex-row gap-2  '>
                {title && <Texto  className='font-bold text-3xl '>{title}</Texto>}
                {header}
            </header>
            <div className='p-0  md:py-2 rounded-lg'>
                <main className='flex-1 w-full '>
                    {children}
                </main>
                {footer}
            </div>

        </div>
    )
}