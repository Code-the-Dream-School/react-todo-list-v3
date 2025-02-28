const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'setTodos',
  updateTodo: 'update',
  completeTodo: 'complete',
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
        todos: [...action.todos],
      };
    case actions.updateTodo:
      return {
        ...state,
        isSaving: true,
      };
    case actions.completeTodo:
      return {
        ...state,
        isSaving: true,
      };
    case actions.endRequest:
      return {
        ...state,
        isSaving: false,
      };
    case actions.setError:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}

export { actions, initialState, reducer };
