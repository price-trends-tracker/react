interface Props {
    item_list: string[];
    selected_item: string;
    onItemSelect: (it: string) => void;
}

function Filter({ item_list, selected_item, onItemSelect }: Props) {
    return (
        <ul className="list-group">
            {item_list.map((it) => (
                <li
                    className={
                        it === selected_item
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    key={it}
                    onClick={() => onItemSelect(it)}
                >
                    {it}
                </li>
            ))}
        </ul>
    );
}

export default Filter;
