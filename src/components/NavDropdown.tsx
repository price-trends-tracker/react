import { Category } from "../interfaces";
import NavDropdownItem from "./NavDropdownItem";

interface Props {
    category: Category;
    category_id: number;
    selected_items: number[];
    hashItem: (category_id: number, item_id: number) => number;
    toggleItem: (category_id: number, item_id: number) => void; // inform parent
}

function NavbarDropdown({
    category,
    category_id,
    selected_items,
    hashItem,
    toggleItem,
}: Props) {
    const onToggleItem = (item_id: number) => {
        toggleItem(category_id, item_id);
    };

    return (
        <li className="nav-item dropdown" key={category.name}>
            <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
            >
                {category.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {category.item_list.map((it, it_id) => (
                    <NavDropdownItem
                        item={it}
                        item_id={it_id}
                        selected={selected_items.includes(
                            hashItem(category_id, it_id)
                        )}
                        toggleItem={onToggleItem}
                        key={it_id}
                    />
                ))}
            </div>
        </li>
    );
}

export default NavbarDropdown;
