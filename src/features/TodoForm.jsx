import { useEffect, useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { styled } from 'styled-components';

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
    <StyledForm onSubmit={handleAddTodo}>
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
    </StyledForm>
  );
}

const StyledForm = styled.form`
  & > * {
    margin: 0.25rem;
  }
  & button:disabled {
    font-style: italic;
  }
`;

export default TodoForm;
