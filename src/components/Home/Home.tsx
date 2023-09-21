import { useState, useEffect } from "react";

import { AuthError } from "../../interfaces/response_error";
import { Item } from "../../interfaces/items";
import Navbar from "./Navbar";
import Filter from "./ItemFilter/Filter";
import Canva from "./Canva/Canva";

function Home() {
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

        fetch(endpoint, { credentials: "include" })
            .then((res) => {
                if (res.ok) return res.json();

                return res.text().then((data) => {
                    throw new Error(data);
                });
            })
            .then((result) => setItemList(result))
            .catch((err) => {
                const data = JSON.parse(err.message);
                const reason: AuthError = JSON.parse(data.detail);
                if (reason.user_invalid === true)
                    window.location.replace("/error/unauthorized-user");
                else if (
                    reason.token_missing === true ||
                    reason.token_invalid === true
                )
                    window.location.replace("/login");
                else throw err;
            });
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

export default Home;
