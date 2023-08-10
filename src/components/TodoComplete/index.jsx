import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class TodoComplete extends Component {
  render() {
    const { todos, completeTodo, deleteTodo } = this.props;
    return (
      <div className="todoMain">
        <nav>
          <ul>
            <Link to={"/"}>
              <li>Текущие</li>
            </Link>
            <Link to={"/completed"}>
              <li className="active">Выполненые</li>
            </Link>
            <Link to={"/archive"}>
              <li>Архив</li>
            </Link>
            <Link to={"/all"}>
              <li>Все задачи</li>
            </Link>
          </ul>
        </nav>
        {todos.filter(
          (complete) =>
            complete.isCompleted === true && complete.isArchived === false
        ).length > 0 ? (
          <h3>Выполненые задачи</h3>
        ) : (
          <h3 className="noTask">Нет выполненых задач</h3>
        )}
        {todos
          .filter(
            (noComplete) =>
              noComplete.isCompleted === true && noComplete.isArchived === false
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
              <span onClick={() => deleteTodo(item.id)}>&times;</span>
            </div>
          ))}
      </div>
    );
  }
}
