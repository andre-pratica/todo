import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
function TodoList() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const storageTodo = JSON.parse(localStorage.getItem('todos'));
        setTodos(storageTodo || []);
    },[]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        const newTodos = [todo, ...todos];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
    }

    const removeTodo = id => {
       const removeArr = [...todos].filter(todo => todo.id !== id);
       localStorage.setItem('todos', JSON.stringify(removeArr));
       setTodos(removeArr);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        const updateTodos = todos.map(item => (item.id === todoId ? newValue : item));
        console.log(updateTodos);

        localStorage.setItem('todos', JSON.stringify(updateTodos));
        setTodos(updateTodos)
    }

    return (
        <div>
           <h1>What's the Plan for Today?</h1> 
           <TodoForm onSubmit={addTodo} />
           <Todo 
           todos={todos} 
           completeTodo={completeTodo} 
           removeTodo={removeTodo}
           updateTodo={updateTodo}
           />
        </div>
    )
}

export default TodoList
