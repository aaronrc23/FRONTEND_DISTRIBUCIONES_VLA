import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "@iconify-icon/react";

interface MenuItemProps {
    item: any;
    isCollapsed: boolean;
    isOpen: boolean;
    onToggle: (label: string) => void;
}

export const SidebarItem = ({
    item,
    isCollapsed,
    isOpen,
    onToggle,
}: MenuItemProps) => {
    const hasChildren = !!item.children;

    return (
        <div className="py-1">
            {hasChildren ? (
                <>
                    <div
                        onClick={() => onToggle(item.label)}
                        className={clsx(
                            "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group",
                            isOpen
                                ? "bg-emerald-500 text-white shadow-md"
                                : "text-slate-400 dark:text-slate-300 hover:bg-slate-700/60 dark:hover:bg-accent hover:text-white"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Icon icon={item.icon} className="text-[22px]" />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </div>

                        {!isCollapsed && (
                            <Icon
                                icon="solar:alt-arrow-down-linear"
                                className={clsx(
                                    "transition-transform duration-300",
                                    isOpen && "rotate-180"
                                )}
                            />
                        )}
                    </div>

                    {!isCollapsed && (
                        <div
                            className={clsx(
                                "grid transition-all duration-300",
                                isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="ml-6 pl-3 border-l border-sidebar-border space-y-1 py-2">
                                    {item.children.map((sub: any) => (
                                        <NavLink
                                            key={sub.label}
                                            to={sub.path}
                                            className={({ isActive }) =>
                                                clsx(
                                                    "block text-sm px-3 py-2 transition",
                                                    isActive
                                                        ? "text-emerald-400 font-semibold"
                                                        : "text-slate-400 dark:text-slate-300 hover:text-emerald-400"
                                                )
                                            }
                                        >
                                            {sub.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        clsx(
                            "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                            isActive
                                ? "bg-emerald-500 text-white shadow-md"
                                : "text-slate-400 dark:text-slate-300 hover:bg-slate-700/60 dark:hover:bg-accent hover:text-white"
                        )
                    }
                >
                    <div className="flex items-center gap-3">
                        <Icon icon={item.icon} className="text-[22px]" />
                        {!isCollapsed && (
                            <span className="text-sm font-medium">{item.label}</span>
                        )}
                    </div>
                </NavLink>
            )}
        </div>
    );
};