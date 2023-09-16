import { Item, getItemName } from "../../interfaces/items";

interface Props {
    item_list: Item[];
    active_id: number;
    onSelect: (id: number) => void;
}

function FilterGrpDiv({ item_list, active_id, onSelect }: Props) {
    return (
        <>
            {item_list.map(it => (
                <li
                    className={
                        "list-group-item " +
                        (it.id === active_id
                            ? "active"
                            : "list-group-item-action list-group-item-light")
                    }
                    key={it.id}
                    onClick={() => onSelect(it.id)}
                >
                    {getItemName(it)}
                </li>
            ))}
        </>
    );
}

export default FilterGrpDiv;
