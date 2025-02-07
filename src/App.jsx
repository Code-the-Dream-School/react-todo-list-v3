import { useState } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {

  const [todoList, setTodoList ] = useState([]);

  function addTodo(newTodo){
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App;
