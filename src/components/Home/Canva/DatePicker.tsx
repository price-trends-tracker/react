import { useState } from "react";

interface Props {
    end: boolean;
    min_dt: string;
    max_dt: string;
    defaul_dt: string;
    onDtSelect: (d: string) => void;
}

function DatePicker({ end, min_dt, max_dt, defaul_dt, onDtSelect }: Props) {
    const [dt, setDt] = useState(defaul_dt)

    return (
        <div className="row">
            <h4>{end ? "End" : "Start"} Date</h4>
            <input
                type="date"
                className="form-control"
                name="date"
                value={dt}
                min={min_dt}
                max={max_dt}
                onChange={(e) => {
                    onDtSelect(e.target.value);
                    setDt(e.target.value);
                }}
            ></input>
        </div>
    );
}

export default DatePicker;
