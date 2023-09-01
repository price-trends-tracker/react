import { useState } from "react";

interface Props {
  items: string[];
  onSelectItem: (item: string) => void;
}

function Navbar({ items, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {items.map((it, id) => (
            <li
              className={selectedIndex === id ? "nav-item active" : "nav-item"}
              key={id}
              onClick={() => {
                setSelectedIndex(id);
                onSelectItem(it);
                console.log(it);
              }}
            >
              <span className="nav-link">
                {it}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
