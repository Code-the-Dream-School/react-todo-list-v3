function TodoForm({onAddTodo}){

  function handleAddTodo(event){
    event.preventDefault();
    const title = event.target.title.value;
    event.target.title.value = "";
    onAddTodo(title);
  }
  return(
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input type="text" id="todoTitle" name="title" />
      <button>Add Todo</button>
    </form>
  )
}

export default TodoForm;
