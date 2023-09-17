import { useEffect, useState } from "react";
import { Item } from "./interfaces/items";
import Navbar from "./components/Navbar";
import Filter from "./components/ItemFilter/Filter";
import Canva from "./components/Canva/Canva";

function App() {
    const category_list = JSON.parse(import.meta.env.VITE_REACT_CATEGORIES);
    const [active_category_id, setActiveCategoryId] = useState(0);

    const [item_list, setItemList] = useState<Item[]>([]);
    const [active_item_id, setActiveItemId] = useState<number>(-1);

    const toggleCategory = (category_id: number) => {
        setActiveCategoryId(category_id);
        setActiveItemId(-1);
    };

    useEffect(() => {
        const cat_name = category_list[active_category_id].toLocaleLowerCase();
        const endpoint = `${
            import.meta.env.VITE_REACT_SERVER_URL
        }/${cat_name}/meta`;
        fetch(endpoint)
            .then((res) => res.json())
            .then((result) => setItemList(result));
    }, [active_category_id]);

    return (
        <>
            <div id="navbar">
                {
                    <Navbar
                        category_list={category_list}
                        selected_category={category_list[active_category_id]}
                        onCategorySelect={toggleCategory}
                    />
                }
            </div>

            <div className="row">
                {
                    <div className="col-sm-3">
                        <div
                            className="card"
                            id="filter"
                            style={{ margin: "30px" }}
                        >
                            <Filter
                                item_list={item_list}
                                active_item_id={active_item_id}
                                onItemSelect={setActiveItemId}
                            />
                        </div>
                    </div>
                }

                <div className="col-sm-8">
                    {
                        <Canva
                            active_category={category_list[active_category_id]}
                            active_item={item_list.find(
                                (item) => item.id == active_item_id
                            )}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default App;
