import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

import { Item, getItemName } from "../../interfaces/items";
import { SsdData, OtherData } from "../../interfaces/data";
import { binarySearch } from "../../utils/binary_search";

interface Props {
    active_category: string;
    active_item?: Item;
    start_dt: string;
    setStartDt: (dt: string) => void;
    end_dt: string;
    setEndDt: (dt: string) => void;
    setMinDt: (d: string) => void;
    setMaxDt: (dt: string) => void;
    loading: boolean;
    setLoading: (b: boolean) => void;
}

function Plot({
    active_category,
    active_item,
    start_dt,
    setStartDt,
    end_dt,
    setEndDt,
    setMinDt,
    setMaxDt,
    loading,
    setLoading,
}: Props) {
    const [data_list, setDataList] = useState<(SsdData | OtherData)[]>([]);

    useEffect(() => {
        if (!active_item) return;

        setLoading(true);

        const cat_name = active_category.toLocaleLowerCase()
        const endpoint = `${import.meta.env.VITE_REACT_SERVER_URL}/${cat_name}/data/${active_item.id}`;

        fetch(endpoint)
            .then((res) => res.json())
            .then((result) => {
                setDataList(result);
                setStartDt(
                    result[Math.max(0, result.length - 100)].last_update
                );
                setEndDt(result[result.length - 1].last_update);
                setMinDt(result[0].last_update);
                setMaxDt(result[result.length - 1].last_update);
                setLoading(false);
            });
    }, [active_category, active_item]);

    const getPlotData = () => {
        if (!active_item || loading) {
            return {
                labels: [],
                datasets: [{ label: "no data", data: [] }],
            };
        }

        let l = binarySearch(
            data_list.map((d) => d.last_update),
            start_dt,
            false
        );
        let r = binarySearch(
            data_list.map((d) => d.last_update),
            end_dt,
            true
        );
        const selected_list = data_list.slice(l, r + 1);

        return {
            labels: selected_list.map((d) => d.last_update),
            datasets: [
                {
                    label: getItemName(active_item),
                    data: selected_list.map((d) => d.average),
                    borderWidth: 1,
                },
            ],
        };
    };

    return <Line data={getPlotData()}></Line>;
}

export default Plot;
