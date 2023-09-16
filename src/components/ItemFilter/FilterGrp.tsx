import { Item } from "../../interfaces/items";

import FilterGrpBtn from "./FilterGrpBtn";
import FilterGrpItem from "./FilterGrpItem";

interface GrpInfo {
    name: string;
    id: number;
    active_id: number;
    onSelect: (id: number) => void;
}

interface ItemsInfo {
    item_list: Item[];
    active_id: number;
    onSelect: (id: number) => void;
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
                {items_info.item_list.map((it) => (
                    <div key={it.id}>
                        <FilterGrpItem
                            item={it}
                            is_active={it.id === items_info.active_id}
                            onSelect={items_info.onSelect}
                        />
                    </div>
                ))}
            </div>
        </ul>
    );
}

export default FilterGrp;
