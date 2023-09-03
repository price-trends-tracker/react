import { Category } from "../interfaces";
import NavbarDropdown from "./NavDropdown";

interface Props {
    categroy_list: Category[];
    seleted_items: number[];
    hashItem: (category_id: number, item_id: number) => number;
    onToggleItem: (category_id: number, item_id: number) => void;
}

function Navbar({
    categroy_list,
    seleted_items,
    hashItem,
    onToggleItem,
}: Props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <a href="#" className="navbar-brand">
                    集邦
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarCollapse" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        {categroy_list.map((cat, cat_id) => (
                            <NavbarDropdown
                                category={cat}
                                category_id={cat_id}
                                selected_items={seleted_items}
                                hashItem={hashItem}
                                toggleItem={onToggleItem}
                                key={cat_id}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
