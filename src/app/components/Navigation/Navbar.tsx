import Link from "next/link";
import styles from './Navigation.module.css'

const menuItems = [
    {
        name: "Startseite",
        link: "/"
    },
    {
        name: "Bearbeiten",
        link: "/edit"
    },
    {
        name: "Projektübersicht",
        link: "/overview"
    }
]
const Navbar: React.FC = () => {
    const buildMenu = () => {
        return menuItems.map((item) => (
            <Link
                key={item.name}
                href={item.link}
                className='pb-5 md:pl-6'>
                {item.name}
            </Link>
        ));
    };
    return(
        <nav className={styles.menu}>
            {buildMenu()}
        </nav>
    )    
}

export default Navbar;