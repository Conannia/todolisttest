import React from 'react'
import Axios from 'axios'
import {
  FormControl,
  Button,
  Navbar,
} from 'react-bootstrap'

import './App.css';
import ToDoItem from './component/TodoItem'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      countToDo: 0,
    }
  }

  fetchData = () => {
    Axios.get('http://localhost:2000/activities')
      .then(res => {
        this.setState({ activities: res.data })
        console.log(res.data.length)
        this.setState({ countToDo: res.data.length })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  onAdd = () => {
    let newTodo = this.refs.todo.value
    let obj = {
      name: newTodo,
      isCompleted: false
    }

    Axios.post('http://localhost:2000/activities', obj)
      .then(res => {
        console.log(res.data)
        this.fetchData()
      })

    this.refs.todo.value = ''
  }

  onDelete = (id) => {
    Axios.delete(`http://localhost:2000/activities/${id}`)
      .then(res => {
        console.log(res.data)
        this.fetchData()
      })
  }

  onComplete = (id) => {
    Axios.patch(`http://localhost:2000/activities/${id}`, { isCompleted: true })
      .then(res => {
        this.fetchData()
      })
  }

  showdata = () => {
    return (
      this.state.activities.map(item => {
        return (
          <ToDoItem
            data={item}
            key={item.id}
            delete={() => this.onDelete(item.id)}
            complete={() => this.onComplete(item.id)}

          />)
      })
    )
  }



  render() {
    return (
      <div className='h-100' style={{ backgroundColor: 'bisque' }} >
        <Navbar className='d-flex justify-content-md-between nav' >
          <h3 className='mx-3' >TO DO LIST Nurul</h3>
          <h3 className='mx-3'>You have {this.state.countToDo} To Do Item</h3>
        </Navbar>
        <div className='d-flex'>
          <div className='left'></div>
          <div>
            {this.showdata()}
            <div className='form' >
              <FormControl
                placeholder='Input Your Activities'
                ref='todo'
              />
              <Button className='mx-3' variant='primary' onClick={this.onAdd} >Add</Button>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default App;
