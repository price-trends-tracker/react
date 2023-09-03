import { useEffect, useState } from "react";
import { SsdItem, PvItem, OtherItem, getItemName } from "./interfaces";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";

function App() {
    const [loading, setLoading] = useState(true);

    const [category_list, setCategoryList] = useState<string[]>([]);
    const [selected_category, setSelectedCategory] = useState("");

    const [item_list, setItemList] = useState<(SsdItem | PvItem | OtherItem)[]>(
        []
    );
    const [selected_item, setSelectedItem] = useState<string>("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/categories/")
            .then((res) => res.json())
            .then((result) => {
                setCategoryList(result);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!selected_category) return;

        const endpoint = `http://127.0.0.1:8000/${selected_category.toLocaleLowerCase()}/`;
        fetch(endpoint)
            .then((res) => res.json())
            .then((result) => {
                setItemList(result);
            });
    }, [selected_category]);

    return (
        <>
            <div id="navbar">
                {loading ? (
                    "Loading"
                ) : (
                    <Navbar
                        category_list={category_list}
                        selected_category={selected_category}
                        onCategorySelect={setSelectedCategory}
                    />
                )}
            </div>

            {selected_category && (
                <div className="row">
                    <div className="col-sm-3">
                        <div
                            className="card"
                            id="filter"
                            style={{ margin: "30px" }}
                        >
                            <Filter
                                item_list={item_list.map((it) =>
                                    getItemName(it)
                                )}
                                selected_item={selected_item}
                                onItemSelect={setSelectedItem}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
