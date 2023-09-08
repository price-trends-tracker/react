import FilterGrpBtn from "./FilterGrpBtn";
import FilterGrpDiv from "./FilterGrpDiv";


interface GrpInfo {
    name: string;
    id: number;
    active_id: number;
    onSelect: (id: number) => void;
}

interface ItemsInfo {
    item_list: string[];
    active_name: string;
    onSelect: (name: string) => void;
}

interface Props {
    grp_info: GrpInfo;
    items_info: ItemsInfo;
}

function FilterGrp({ grp_info, items_info }: Props) {
    const grp_selected = grp_info.active_id == grp_info.id;

    return (
        <ul className="list-group">
            <FilterGrpBtn
                name={grp_info.name}
                id={grp_info.id}
                active_id={grp_info.active_id}
                onSelect={grp_info.onSelect}
            />
            <div className={grp_selected ? "collapse show" : "collapse"}>
                <FilterGrpDiv
                    item_list={items_info.item_list}
                    active_name={items_info.active_name}
                    onSelect={items_info.onSelect}
                />
            </div>
        </ul>
    );
}

export default FilterGrp;
