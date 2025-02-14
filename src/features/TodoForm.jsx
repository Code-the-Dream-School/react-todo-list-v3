import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const todoTitleInput = useRef(null);

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = { title: workingTodo, id: Date.now(), isCompleted: false };
    onAddTodo(newTodo);
    setWorkingTodo('');
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodo}
        labelText="Todo"
        onChange={(e) => setWorkingTodo(e.target.value)}
        elementId="todoTitle"
      />
      <button disabled={workingTodo === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
