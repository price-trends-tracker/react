interface Props {
    item_list: string[];
    selected_index: number;
    onItemSelect: (id: number) => void;
}

function Filter({ item_list, selected_index, onItemSelect }: Props) {
    return (
        <ul className="list-group">
            {item_list.map((it, id) => (
                <li
                    className={
                        id === selected_index
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    key={id}
                    onClick={() => onItemSelect(id)}
                >
                    {it}
                </li>
            ))}
        </ul>
    );
}

export default Filter;
