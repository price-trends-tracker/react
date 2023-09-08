import { useState } from "react";

import DatePicker from "./DatePicker";
import Plot from "./Plot";
import { SsdItem, PvItem, OtherItem } from "../../interfaces/items";

interface Props {
    active_category: string;
    active_item?: SsdItem | PvItem | OtherItem;
}

function Canva({ active_category, active_item }: Props) {
    const [loading, setLoading] = useState(false);

    const [start_dt, setStartDt] = useState("");
    const [end_dt, setEndDt] = useState("");

    const [min_dt, setMinDt] = useState("");
    const [max_dt, setMaxDt] = useState("");

    return (
        <>
            <div
                className="row"
                id="date-picker-container"
                style={{ marginBottom: "30px" }}
            >
                {!loading &&
                    [false, true].map((end, id) => (
                        <div className="col-sm-6" key={id}>
                            <div className="row">
                                <div className="col-sm-8">
                                    <DatePicker
                                        end={end}
                                        min_dt={min_dt}
                                        max_dt={max_dt}
                                        defaul_dt={end ? end_dt : start_dt}
                                        onDtSelect={(dt: string) =>
                                            end ? setEndDt(dt) : setStartDt(dt)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="row" id="plot-container">
                {
                    <Plot
                        active_category={active_category}
                        active_item={active_item}
                        start_dt={start_dt}
                        setStartDt={setStartDt}
                        end_dt={end_dt}
                        setEndDt={setEndDt}
                        setMinDt={setMinDt}
                        setMaxDt={setMaxDt}
                        loading={loading}
                        setLoading={setLoading}
                    />
                }
            </div>
        </>
    );
}

export default Canva;
