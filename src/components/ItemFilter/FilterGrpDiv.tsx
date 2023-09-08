interface Props {
    item_list: string[];
    active_name: string;
    onSelect: (name: string) => void;
}

function FilterGrpDiv({ item_list, active_name, onSelect }: Props) {
    return (
        <>
            {item_list.map((it, id) => (
                <li
                    className={
                        "list-group-item " +
                        (it === active_name
                            ? "active"
                            : "list-group-item-action list-group-item-light")
                    }
                    key={id}
                    onClick={() => onSelect(it)}
                >
                    {it}
                </li>
            ))}
        </>
    );
}

export default FilterGrpDiv;
