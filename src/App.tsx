import { useEffect, useState } from "react";
import { SsdItem, PvItem, OtherItem, getItemName } from "./interfaces/items";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Plot from "./components/Plot";

function App() {
    const [category_list, setCategoryList] = useState<string[]>([]);
    const [active_category_id, setActiveCategoryId] = useState(-1);

    const [item_list, setItemList] = useState<(SsdItem | PvItem | OtherItem)[]>(
        []
    );
    const [active_item_name, setActiveItemName] = useState<string>("");

    const toggleCategory = (category_id: number) => {
        setActiveCategoryId(category_id);
        setActiveItemName("");
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/categories/")
            .then((res) => res.json())
            .then((result) => {
                setCategoryList(result);
                setActiveCategoryId(0);
            });
    }, []);

    useEffect(() => {
        if (active_category_id < 0) return;

        const cat_name = category_list[active_category_id];
        const endpoint = `http://127.0.0.1:8000/${cat_name.toLocaleLowerCase()}`;
        fetch(endpoint)
            .then((res) => res.json())
            .then((result) => setItemList(result));
    }, [active_category_id]);

    return (
        <>
            <div id="navbar">
                {active_category_id < 0 ? (
                    <h1>Loading / Banned by CORS</h1>
                ) : (
                    <Navbar
                        category_list={category_list}
                        selected_category={category_list[active_category_id]}
                        onCategorySelect={toggleCategory}
                    />
                )}
            </div>

            {active_category_id >= 0 && (
                <div className="row">
                    <div className="col-sm-3">
                        <div
                            className="card"
                            id="filter"
                            style={{ margin: "30px" }}
                        >
                            <Filter
                                item_list={item_list}
                                selected_name={active_item_name}
                                onItemSelect={setActiveItemName}
                            />
                        </div>
                    </div>
                    {active_item_name && (
                        <div className="col-sm-8">
                            <div id="plot">
                                <Plot
                                    selected_category={
                                        category_list[active_category_id]
                                    }
                                    selected_item={item_list.find(
                                        (item) =>
                                            getItemName(item) ==
                                            active_item_name
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
