import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter(
    (todo) => todo.isCompleted === false
  );

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <>
          {isLoading ? (
            <p>Todo list loading...</p>
          ) : (
            <p>Add a todo above to get started</p>
          )}
        </>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
