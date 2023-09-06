import { useState, useEffect } from "react";
import { SsdItem, PvItem, OtherItem, getItemName } from "../interfaces/items";
import { SsdData, OtherData } from "../interfaces/data";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
    selected_category: string;
    selected_item: SsdItem | PvItem | OtherItem;
}

function Plot({ selected_category, selected_item }: Props) {
    const [data_list, setDataList] = useState<(SsdData | OtherData)[]>([]);

    useEffect(() => {
        const endpoint = `http://127.0.0.1:8000/${selected_category.toLocaleLowerCase()}/`;

        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getBody(selected_item)),
        })
            .then((res) => res.json())
            .then((result) => setDataList(result));
    }, [selected_category, selected_item]);

    const getBody = (item: SsdItem | PvItem | OtherItem) => {
        if ("brand" in item) return { brand: item.brand };

        const body = { item: item.item };
        return "material" in item
            ? {
                  ...body,
                  material: item.material,
              }
            : {
                  ...body,
                  price_type: item.price_type,
              };
    };

    const plot_data = {
        labels: data_list.map((d) => d.last_update.split("T")[0]),
        datasets: [
            {
                label: getItemName(selected_item),
                data: data_list.map((d) => d.average),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Average",
            },
        },
    };

    return (
        <>
            <div id="plot-container">
                <Line data={plot_data} options={options}></Line>
            </div>
        </>
    );
}

export default Plot;
