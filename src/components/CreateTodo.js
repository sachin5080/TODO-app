import React, { useState } from 'react'
import TodoList from './TodoList'
import swal from 'sweetalert'

export default function CreateTodo() {

  const [todo, setTodo] = useState({ title: '', done: false })
  const [todoArr, setTodoArr] = useState([])

  let todos = localStorage.hasOwnProperty("todos") ? JSON.parse(localStorage.getItem('todos')) : []

  const onchange = (event) => {
    let { value } = event.target
    let obj = {}
    obj["title"] = value
    obj["done"] = false
    setTodo(obj)
  }

  const createTodo = (event) => {
    const { name } = event.target
    if (event.key === "Enter" || name === 'addTodo') {
      if (todo.title !== '') {
        todos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
        setTodo({ Title: '', done: false })
      } else {
        swal("Oops", "Please write todo first", "error")
      }
    }
  }
  const completeTodo = (i) => {
    if (todos[i]["done"] !== true) {
      todos[i]["done"] = true
      localStorage.setItem('todos', JSON.stringify(todos))
      setTodoArr(todos)
      swal("Good job!", "Todo Completed", "success");
    }
  }

  const deleteTodo =(i) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted , you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(res => {
      if(res) {
        todos.splice(i,1)
        localStorage.setItem("todos", JSON.stringify(todos))
        setTodoArr(todos)
      }
    })
  }


  return (
    <>
      <div className='box'>
        <div className="text-end">
          <h2>React Todo App</h2>
          <h4>Add a new Todo</h4>
        </div>
        <div className='text-todo'>
          <input type="text" name='todo' placeholder='Write here...' value={todo.title} onKeyPress={createTodo} onChange={onchange} />
          <button className='btn-todo' type='button' name='addtodo' onClick={createTodo}>Add Todo</button>
        </div>
      </div>
      <TodoList todoArr={todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo} />
    </>
  )
}
