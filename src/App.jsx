import { useCallback, useEffect, useState } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';
import './App.css';

const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortField, setSortField] = useState('createdTime');
  const [queryString, setQueryString] = useState('');

  //Airtable-specific URL with params

  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortField, sortDirection]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const { records } = await resp.json();
        setTodoList(
          records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            if (!record.fields.isCompleted) {
              todo.isCompleted = false;
            }
            return todo;
          })
        );
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [queryString, sortDirection, sortField, encodeUrl]);

  //pessimistic
  const addTodo = async (title) => {
    const newTodo = { title, id: Date.now(), isCompleted: false };
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.error);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.dir(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  //optimistic - uses catch to revert
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            //explicitly only want these fields
            title: editedTodo.title,
            createdTime: editedTodo.createdTime,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.error);
      }
      const { records } = await resp.json();
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }
        return todo;
      });
      setTodoList([...updatedTodos]);
    } catch (error) {
      console.dir(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...originalTodo };
        }
        return todo;
      });
      setTodoList([...revertedTodos]);
    }
  };

  const completeTodo = async (id) => {
    const [originalTodo] = todoList.filter((todo) => todo.id === id);
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    const payload = {
      records: [
        {
          id: id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.error);
      }
      const { records } = await resp.json();
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }
        return todo;
      });
      setTodoList([...updatedTodos]);
    } catch (error) {
      console.dir(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...originalTodo };
        }
        return todo;
      });
      setTodoList([...revertedTodos]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        isLoading={isLoading}
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      <hr />
      <TodosViewForm
        queryString={queryString}
        setQueryString={setQueryString}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
      />
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <hr />
          <p className={styles.errorMessage}>{errorMessage}</p>
          <button type="button" onClick={() => setErrorMessage('')}>
            Dismiss Error Message
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
