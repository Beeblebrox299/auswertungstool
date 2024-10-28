import Link from "next/link";

interface MenuItem {
    name: string,
    link: string,
    submenu?: MenuItem[]
}

const menuItems:MenuItem[] = [
    {
        name: "Startseite",
        link: "/"
    },
    {
        name: "Beiträge hinzufügen",
        link: "",
        submenu: [
            {name: "Datei hochladen", link: "/edit/file-upload"},
            {name: "Manuell eintragen", link: "/edit/manual"}
        ]
    },
    {
        name: "Codierung",
        link: "/edit/coding"
    },
    {
        name: "Auswertung",
        link: "",
        submenu: [
            {name: "Projektübersicht", link: "/overview"},
            {name: "Grafiken / Diagramme", link: "/analysis"},
            {name: "Bericht", link: "/report"}
        ]
    },
    {
        name: "Einstellungen",
        link: "/edit/categories"
    }
]
const Navbar: React.FC = () => {
    const buildMenu = (menuItems: MenuItem[]) => {
        const buildMenuItem = (item: MenuItem) => {
            return(
                <div key={item.name} className="relative group">
                    {(item.link !== "") ?
                    <Link
                        href={item.link}
                        className='block p-5 hover:text-gray-600 md:pl-6 text-lg'>
                        {item.name}
                    </Link> :
                    <span
                        className='block p-5 md:pl-6 text-lg'>
                        {item.name}
                    </span>}
                    {item.submenu && (
                        <div className="absolute hidden bg-gray-200 mt-0 left-full top-0 p-2 group-hover:block w-52">
                            {item.submenu.map((subitem => (
                                <Link
                                    key={subitem.name}
                                    href={subitem.link}
                                    className="block px-4 py-2 text-black hover:bg-gray-300"
                                >
                                    {subitem.name}
                                </Link>
                            )))}
                        </div>
                    )}
                </div>)
        }
        return menuItems.map((item) => (
            buildMenuItem(item)
        ));
    };
    return(
        <nav className="bg-gray-300 p-5 w-52 h-screen fixed">
            {buildMenu(menuItems)}
        </nav>
    )    
}

export default Navbar;