import React from 'react'
import {
    Button
} from 'react-bootstrap'
import './TodoItem.css';

class ToDoItem extends React.Component {
    render() {
        return (
            <div className='item' >
                <p style={styles.p}> {this.props.data.id}. {this.props.data.name}</p>
                <div className='justify-content-md-between but' >
                    <Button variant="danger" onClick={this.props.delete} className="mx-3">Delete</Button>
                    <Button variant="success" onClick={this.props.complete} className="mx-3" disabled={this.props.isComplete}>
                        {this.props.data.isCompleted ? "Finished" : "Completed"}
                    </Button>
                </div>
            </div>
        )
    }
}

const styles = {
    
    p: {
        margin: '0.5rem'
    }
}

export default ToDoItem