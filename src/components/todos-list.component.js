import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { apiAddress } from './variables';

const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={'/edit/' + props.todo._id}>Edit</Link>
      <Link to="/" onClick={props.deleteToDo(props.todo._id)} style={{ marginLeft: '10px' }}>
        Delete
      </Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${apiAddress}/todos`)
      // axios.get('http://localhost:4000/todos')
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    // axios.get('http://localhost:4000/todos')
    axios
      .get(`${apiAddress}/todos`)
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteToDo = (id) => () => {
    axios
      .delete(`${apiAddress}/todos/${id}`)
      .then((res) => {
        // this.setState({
        //   todos: res.data,
        // });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  todoList = () =>
    this.state.todos.map((todo, index) => (
      <Todo todo={todo} deleteToDo={this.deleteToDo} key={index} />
    ));

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
