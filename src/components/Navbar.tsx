import { useState } from "react";

interface BaseItem {
    price_type: string;
    start_date: string;
    end_date: string;
}

interface SsdItem extends BaseItem {
    brand: string;
    spec: string;
    series: string;
}

interface OtherItem extends BaseItem {
    item: string;
}

interface Category {
    category: string;
    item_list: (SsdItem | OtherItem)[];
}

interface Props {
    categroy_list: Category[];
}

function Navbar({ categroy_list }: Props) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const getItemId = (cat_id: number, it_id: number): number => {
        return cat_id * 100 + it_id;
    }

    const toggleSelectItem = (id: number) => {
        if (selectedItems.includes(id))
            setSelectedItems(selectedItems.filter(i => (i != id)))
        else
            setSelectedItems([...selectedItems, id])
    }

    const toggleItemStyle = (cat_id: number, item_id: number) => {
        const id = getItemId(cat_id, item_id)

        return selectedItems.includes(id) ? {color: "#FFFFFF", backgroundColor: "#000000"} : {}
    }

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
                            <li className="nav-item dropdown" key={cat_id}>
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    {cat.category}
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    {cat.item_list.map((it, it_id) => (
                                        <a
                                            href="#"
                                            className="dropdown-item"
                                            key={it_id}
                                            onClick={() => toggleSelectItem(getItemId(cat_id, it_id))}
                                            style={toggleItemStyle(cat_id, it_id)}
                                        >
                                            {it.item || it.brand}
                                        </a>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
