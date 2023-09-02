import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
    const [category_list, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/info")
            .then((res) => res.json())
            .then((result) => {
                setCategoryList(result);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div>
                {loading ? (
                    "Loading"
                ) : (
                    <Navbar categroy_list={category_list}/>
                )}
            </div>
        </>
    );
}

export default App;
