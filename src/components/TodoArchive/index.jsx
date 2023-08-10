import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodoArchive extends Component {
  render() {
    const { todos, completeTodo, toggleArchive, deleteTodo } = this.props;
    return (
      <div className="todoMain">
        <nav>
          <ul>
            <Link to={"/"}>
              <li>Текущие</li>
            </Link>
            <Link to={"/completed"}>
              <li>Выполненые</li>
            </Link>
            <Link to={"/archive"}>
              <li className="active">Архив</li>
            </Link>
            <Link to={"/all"}>
              <li>Все задачи</li>
            </Link>
          </ul>
        </nav>
        {todos.filter(
          (archive) =>
            archive.isCompleted === false && archive.isArchived === true
        ).length > 0 ? (
          <h3>Архив задач</h3>
        ) : (
          <h3 className="noTask">Архив задач пуст</h3>
        )}
        {todos
          .filter(
            (item) => item.isCompleted === false && item.isArchived === true
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
