interface Props {
    category_list: string[];
    selected_category: string;
    onCategorySelect: (category_id: number) => void;
}

function Navbar({ category_list, selected_category, onCategorySelect }: Props) {
    const getNavLinkStyle = (cat: string) => {
        return selected_category === cat
            ? { color: "#FFFFFF", backgroundColor: "#000000" }
            : {};
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <h2 className="navbar-brand">Price Trend</h2>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbarCollapse" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        {category_list.map((cat, id) => (
                            <li className="nav-item" key={cat}>
                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={() => onCategorySelect(id)}
                                    style={getNavLinkStyle(cat)}
                                >
                                    {cat}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
