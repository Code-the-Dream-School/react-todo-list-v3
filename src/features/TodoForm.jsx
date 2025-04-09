import { useEffect, useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodo, setWorkingTodo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const todoTitleInput = useRef(null);

  useEffect(() => {
    if (workingTodo === '') {
      if (isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(true);
    } else {
      if (!isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(false);
    }
  }, [workingTodo, isButtonDisabled]);

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodo);
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
      <button disabled={isButtonDisabled}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
