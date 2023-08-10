import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

export default class AllTodos extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: "",
      inputValue: "",
    };
  }

  render() {
    const { todos, completeTodo, toggleArchive, deleteTodo } = this.props;
    const updateSearchValue = debounce(
      (str) => this.setState({ inputSearch: str }),
      150
    );

    const inputHandler = (e) => {
      this.setState({ inputValue: e.target.value });
      updateSearchValue(e.target.value);
    };

    return (
      <div className="searchBlock">
        <nav>
          <ul>
            <Link to={"/"}>
              <li>Текущие</li>
            </Link>
            <Link to={"/completed"}>
              <li>Выполненые</li>
            </Link>
            <Link to={"/archive"}>
              <li>Архив</li>
            </Link>
            <Link to={"/all"}>
              <li className="active">Все задачи</li>
            </Link>
          </ul>
        </nav>
        <h2>Поиск</h2>
        <input
          type="text"
          placeholder="Введите название задачи"
          value={this.state.inputValue}
          onChange={(e) => inputHandler(e)}
        />
        <div>
          {todos
            .filter((searching) =>
              searching.title
                .toLowerCase()
                .includes(this.state.inputSearch.toLowerCase())
            )
            .map((item) => (
              <div key={item.id} className="todoItem">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => completeTodo(item.id)}
                  className="completeTodo"
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
                <p>{item.date}</p>
                <button>
                  <img width={20} height={20} src="/images/pen.svg" alt="pen" />
                </button>
                <button onClick={() => toggleArchive(item.id)}>
                  <img
                    width={20}
                    height={20}
                    src="/images/archive.svg"
                    alt="archive"
                  />
                </button>
                <span onClick={() => deleteTodo(item.id)}>&times;</span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
