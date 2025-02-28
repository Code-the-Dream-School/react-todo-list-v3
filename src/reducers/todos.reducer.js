const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'setTodos',
  addTodo: 'add',
  updateTodo: 'update',
  revertTodo: 'revert',
  completeTodo: 'complete',
  startRequest: 'startRequest',
  endRequest: 'endRequest',
  setError: 'setError',
  clearError: 'clearError',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: [
          ...action.records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            if (!record.fields.isCompleted) {
              todo.isCompleted = false;
            }
            return todo;
          }),
        ],
        isLoading: false,
      };
    case actions.addTodo: {
      const savedTodo = {
        id: action.records[0]['id'],
        ...action.records[0].fields,
      };
      if (!action.records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
      };
    }
    case actions.revertTodo:
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.editedTodo.id) {
          return { ...action.editedTodo };
        }
        return todo;
      });
      return {
        ...state,
        todoList: [...updatedTodos],
      };
    }
    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      return {
        ...state,
        todoList: [...updatedTodos],
      };
    }
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.setError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
        isSaving: false,
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}

export { actions, initialState, reducer };
