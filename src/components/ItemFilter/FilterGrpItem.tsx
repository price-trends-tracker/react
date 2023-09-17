import { Item, getItemName } from "../../interfaces/items";

interface Props {
    item: Item;
    is_active: boolean;
    onSelect: (id: number) => void;
}

function FilterGrpItem({ item, is_active, onSelect }: Props) {
    return (
        <li
            className={
                "list-group-item " +
                (is_active
                    ? "active"
                    : "list-group-item-action list-group-item-light")
            }
            onClick={() => onSelect(item.id)}
        >
            {getItemName(item)}
        </li>
    );
}

export default FilterGrpItem;
