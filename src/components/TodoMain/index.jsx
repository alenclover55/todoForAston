import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodoMain extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    console.log(this.props.todos);
  }
  render() {
    const { todos, completeTodo, toggleArchive, deleteTodo } = this.props;

    return (
      <div className="todoMain">
        <nav>
          <ul>
            <Link to={"/"}>
              <li className="active">Текущие</li>
            </Link>
            <Link to={"/completed"}>
              <li>Выполненые</li>
            </Link>
            <Link to={"/archive"}>
              <li>Архив</li>
            </Link>
            <Link to={"/all"}>
              <li>Все задачи</li>
            </Link>
          </ul>
        </nav>
        <h3>Текущие</h3>
        {todos
          .filter(
            (complete) =>
              complete.isCompleted === false && complete.isArchived === false
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
    );
  }
}
