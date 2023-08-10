import React, { Component} from "react";
import TodoMain from "./components/TodoMain";
import { Route, Routes } from "react-router-dom";
import TodoComplete from "./components/TodoComplete";
import TodoArchive from "./components/TodoArchive";
import AllTodos from "./components/AllTodos";
import "./App.scss";
import { ThemeContext, themes } from "./context/ThemeContext";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputTitle: "",
      inputSubtitle: "",
      theme: themes.dark,
    };
  }

  createTodoItem() {
    if (
      this.state.inputTitle.trim() === "" &&
      this.state.inputTitle.trim().length > 2
    ) {
      alert("Введены некорректные данные");
    } else {
      this.setState({
        todos: [
          {
            id: Math.random() * 9 + Math.floor(5),
            title: this.state.inputTitle,
            subtitle: this.state.inputSubtitle,
            date: new Date().toLocaleString(),
            isCompleted: false,
            isArchived: false
          },
          ...this.state.todos,
        ],
        inputTitle: "",
        inputSubtitle: "",
      });
    }
    localStorage.setItem("todoItem", JSON.stringify([...this.state.todos]));
  }

  todoDelete(id) {
    this.setState((prev) => ({
      todos: prev.todos.filter((item) => item.id !== id),
    }));
    localStorage.removeItem("todoItem");
    localStorage.setItem("todoItem", JSON.stringify([...this.state.todos]));
  }

  componentDidMount() {
    const storedTodos = JSON.parse(localStorage.getItem("todoItem"));
    if (storedTodos) {
      this.setState({ todos: [...this.state.todos, ...storedTodos] });
    }
  }

  componentDidUpdate() {
      localStorage.setItem("todoItem", JSON.stringify([...this.state.todos]))
      if(this.state.theme === themes.light){
        document.body.classList.add('light')
      }else{
        document.body.classList.remove('light')
      }
  }

  toggleComplete(id) {
    this.setState(prev=> ({todos: prev.todos.map(item =>{
      if(item.id === id){
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }else {
        return item
      }
    }) 
    }))
    
  }

  addToArchive(id){
    this.setState(prev=> ({todos: prev.todos.map(item =>{
      if(item.id === id && item.isCompleted === false){
        return {
          ...item,
          isArchived: !item.isArchived
        }
      }else{
        return item
      }
    })
    }))
  }
  changeTheme(){
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };
  

  render() {
    return (
      <div>
        <div className="createBlock">
          <h2>Панель создания задачи</h2>
          <span className="changeTheme" onClick={()=>this.changeTheme()}>Сменить тему</span>
          <div>
            <input
              type="text"
              value={this.state.inputTitle}
              onChange={(e) => this.setState({ inputTitle: e.target.value })}
              placeholder="Title...."
            />
            <input
              type="text"
              value={this.state.inputSubtitle}
              onChange={(e) => this.setState({ inputSubtitle: e.target.value })}
              placeholder="Subtitle...."
            />
            <button onClick={() => this.createTodoItem()}>Create</button>
          </div>
        </div>
        
        <Routes>
          <Route path={'/'} element={<TodoMain
          todos={this.state.todos}
          completeTodo={(id)=>this.toggleComplete(id)}
          toggleArchive={(id)=>this.addToArchive(id)}
          deleteTodo={(id)=>this.todoDelete(id)}
        />}/>
        <Route path={'/completed'} element={<TodoComplete
          todos={this.state.todos}
          completeTodo={(id)=>this.toggleComplete(id)}
          deleteTodo={(id)=>this.todoDelete(id)}
        />}/>
        <Route path={'/archive'} element={<TodoArchive
          todos={this.state.todos}
          completeTodo={(id)=>this.toggleComplete(id)}
          toggleArchive={(id)=>this.addToArchive(id)}
          deleteTodo={(id)=>this.todoDelete(id)}
        />}/>
        <Route path={'/all'} element={<AllTodos
          todos={this.state.todos}
          completeTodo={(id)=>this.toggleComplete(id)}
          toggleArchive={(id)=>this.addToArchive(id)}
          deleteTodo={(id)=>this.todoDelete(id)}
        />}/>
        </Routes>
      </div>
    );
  }
}
App.contextType = ThemeContext;
