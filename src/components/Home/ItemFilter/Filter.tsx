import { useState, useEffect } from "react";

import { Item } from "../../../interfaces/items";
import FilterGrp from "./FilterGrp";

interface Props {
    item_list: Item[];
    active_item_id: number;
    onItemSelect: (id: number) => void;
}

function Filter({ item_list, active_item_id, onItemSelect }: Props) {
    const [active_grp_id, setActiveGrpId] = useState(0);
    const [filter_grp, setFilterGrp] = useState<Record<string, Item[]>>({});

    useEffect(() => {
        setActiveGrpId(0);

        let grp: Record<string, Item[]> = {};
        item_list.map((item) => {
            const key = "material" in item ? "material" : "price_type";

            if (item[key] in grp) grp[item[key]].push(item);
            else grp[item[key]] = [item];
        });

        setFilterGrp(grp);
    }, [item_list]);

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
                        active_id: active_item_id,
                        onSelect: onItemSelect,
                    }}
                />
            ))}
        </ul>
    );
}

export default Filter;
