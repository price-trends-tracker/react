import { useEffect, useState } from "react";
import { Category } from "./interfaces";
import Navbar from "./components/Navbar";

function App() {
    const [category_list, setCategoryList] = useState<Category[]>([]);
    const [select_items, setSelectedItems] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/info")
            .then((res) => res.json())
            .then((result) => {
                setCategoryList(result);
                setLoading(false);
            });
    }, []);

    const hashItem = (category_id: number, item_id: number): number => {
        return category_id * 1000 + item_id;
    };

    const toggleItem = (cat_id: number, item_id: number) => {
        const id = hashItem(cat_id, item_id);

        if (select_items.includes(id))
            setSelectedItems(select_items.filter((it) => it !== id));
        else setSelectedItems([...select_items, id]);
    };

    return (
        <>
            <div>
                {loading ? (
                    "Loading"
                ) : (
                    <Navbar
                        categroy_list={category_list}
                        seleted_items={select_items}
                        hashItem={hashItem}
                        onToggleItem={toggleItem}
                    />
                )}
            </div>
            <p>{select_items}</p>
        </>
    );
}

export default App;
