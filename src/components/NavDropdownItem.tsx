import { SsdItem, OtherItem } from "../interfaces";

interface Props {
    item: SsdItem | OtherItem;
    item_id: number;
    selected: boolean;
    toggleItem: (item_id: number) => void; // inform parent
}

function NavDropdownItem({ item, item_id, selected, toggleItem }: Props) {
    const getItemStyle = () => {
        return selected ? { color: "#FFFFFF", backgroundColor: "#000000" } : {};
    };

    return (
        <span
            className="dropdown-item"
            onClick={() => toggleItem(item_id)}
            style={{
                ...getItemStyle(),
                border: "1px solid white",
            }}
        >
            {"brand" in item ? item.brand : item.item}
        </span>
    );
}

export default NavDropdownItem;
