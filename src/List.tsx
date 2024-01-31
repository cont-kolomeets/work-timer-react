import { Component, ReactNode } from "react";

class List extends Component {
  render(): ReactNode {
    const items = [
      { id: 1, label: "Apple", color: "red" },
      { id: 2, label: "Banana", color: "yellow" },
      { id: 3, label: "Watermellon", color: "green" }
    ];

    const content = items.map((item) => {
      return (
        <li
          key={item.id}
          style={{
            color: item.color,
          }}
        >
          {item.label}
        </li>
      );
    });

    return <ul>{content}</ul>;
  }
}

export default List;
