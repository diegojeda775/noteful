import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import NotesContext from '../NotesContext'
import { format } from 'date-fns'
import PropTypes from 'prop-types';


class Note extends Component {

  static contextType = NotesContext;

  

  deleteNoteRequest(noteId, callback){
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        callback(noteId);
        this.props.history.push('/');
      })
      .catch(error => {
        console.error(error)
      })
  }

  render(){
    const note = this.props;
    const { deleteNote } = this.context; 
    if(!note) {
      throw new Error('Error: Notes are not available')
    } else {
      return (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${note.id}`}>
              {note.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button' onClick={() => this.deleteNoteRequest(note.id, deleteNote)}>
            Delete
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(note.modified, 'do MM yyyy')}
              </span>
            </div>
          </div>
        </div>
      )
    }
    
  }
  
}

export default withRouter(Note);

Note.propTypes = {
  note: PropTypes.object,
};