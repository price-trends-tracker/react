import { useState, useEffect } from "react";

import { SsdItem, PvItem, OtherItem, getItemName } from "../interfaces/items";
import FilterGrp from "./FilterGrp";

interface Props {
    item_list: (SsdItem | PvItem | OtherItem)[];
    selected_name: string;
    onItemSelect: (name: string) => void;
}

function Filter({ item_list, selected_name, onItemSelect }: Props) {
    const [active_grp_id, setActiveGrpId] = useState(0);
    useEffect(() => {
        setActiveGrpId(0);
    }, [item_list]);

    let filter_grp: Record<string, string[]> = {};
    item_list.map((item) => {
        const key = "price_type" in item ? "price_type" : "material";
        const name = getItemName(item);

        if (item[key] in filter_grp) filter_grp[item[key]].push(name);
        else filter_grp[item[key]] = [name];
    });

    return (
        <ul className="list-group">
            {Object.keys(filter_grp).map((price_type, id) => (
                <FilterGrp
                    key={id}
                    grp_info={{
                        name: price_type,
                        id: id,
                        active_id: active_grp_id,
                        onSelect: setActiveGrpId,
                    }}
                    items_info={{
                        item_list: filter_grp[price_type],
                        active_name: selected_name,
                        onSelect: onItemSelect,
                    }}
                />
            ))}
        </ul>
    );
}

export default Filter;
