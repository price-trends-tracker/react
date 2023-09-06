interface Props {
    name: string;
    id: number;
    active_id: number;
    onSelect: (id: number) => void;
}

function FilterGrpBtn({ name, id, active_id, onSelect }: Props) {
    const grp_selected = active_id == id;
    const expand_icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
            style={{ float: "right", marginRight: "10px" }}
        >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
    );

    return (
        <>
            <button
                className="btn btn-dark"
                onClick={() => onSelect(id)}
                style={{ margin: "2px" }}
            >
                <div className="row">
                    <div className="col-sm-8">
                        <span style={{ float: "left", marginLeft: "30px" }}>
                            {name}
                        </span>
                    </div>
                    <div className="col">{!grp_selected && expand_icon}</div>
                </div>
            </button>
        </>
    );
}

export default FilterGrpBtn;
