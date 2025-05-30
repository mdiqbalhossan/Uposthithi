import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: route("dashboard"),
                },
            ],
        },
        {
            label: "Course and Class Management",
            items: [
                {
                    label: "Departments",
                    icon: "pi pi-fw pi-building",
                    to: route("departments.index"),
                },
                {
                    label: "Batches",
                    icon: "pi pi-fw pi-calendar",
                    to: route("batches.index"),
                },
                {
                    label: "Courses",
                    icon: "pi pi-fw pi-book",
                    to: route("courses.index"),
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
