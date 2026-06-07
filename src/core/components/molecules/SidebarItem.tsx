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
        <div className="py-0.5">
            {hasChildren ? (
                <>
                    <div
                        onClick={() => onToggle(item.label)}
                        className={clsx(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-r-lg transition-all duration-300 cursor-pointer group border-l-[3px]",
                            isOpen
                                ? "bg-sidebar-hover text-sidebar-primary dark:text-white border-l-sidebar-primary"
                                : "text-sidebar-accent-foreground border-l-transparent hover:border-sidebar-primary  hover:bg-sidebar-hover/40 hover:text-sidebar-foreground hover:border-l-sidebar-accent"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Icon icon={item.icon} className={clsx("text-[22px] transition-all duration-300", isOpen && "text-sidebar-primary")} />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </div>

                        {!isCollapsed && (
                            <Icon
                                icon="solar:alt-arrow-down-linear"
                                className={clsx(
                                    "transition-transform duration-300 text-sidebar-accent-foreground/60",
                                    isOpen && "rotate-180 text-sidebar-primary"
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
                                <div className="ml-7 pl-4 border-l-2 border-sidebar-border/20 space-y-0.5 py-1.5">
                                    {item.children.map((sub: any) => (
                                        <NavLink
                                            key={sub.label}
                                            to={sub.path}
                                            className={({ isActive }) =>
                                                clsx(
                                                    "block text-sm px-3 py-2 transition-all duration-200 rounded-r-lg border-l-[3px]",
                                                    isActive
                                                        ? "bg-sidebar-accent/70 border-l-sidebar-primary text-sidebar-primary font-semibold"
                                                        : "text-sidebar-accent-foreground/80 border-l-transparent font-medium hover:bg-sidebar-hover hover:text-sidebar-foreground hover:border-l-sidebar-accent"
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
                            "w-full flex items-center justify-between px-4 py-2.5 transition-all duration-300 group rounded-r-lg border-l-[3px]",
                            isActive
                                ? "bg-sidebar-accent/70 border-l-sidebar-primary text-sidebar-primary"
                                : "text-sidebar-accent-foreground border-l-transparent hover:bg-sidebar-hover hover:text-sidebar-foreground hover:border-l-sidebar-accent"
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