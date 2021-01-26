import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NotesContext from '../NotesContext'
//import { format } from 'date-fns'

// function deleteNoteRequest(noteId, callback){
//   fetch(`http://localhost:9090/notes/${noteId}`, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json'
//     },
//   })
//     .then(res => {
//       if(!res.ok){
//         return res.json().then(error => {
//           throw error
//         })
//       }
//       return res.json()
//     })
//     .then(data => {
//       callback(noteId)
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

export default class Note extends Component {
  static contextType = NotesContext;

  deleteNoteRequest(noteId, callback, history){
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
        history.push('/');
        callback(noteId);
      })
      .catch(error => {
        console.error(error)
      })
  }

  render(){
    let history = useHistory();
    const note = this.props;
    const { deleteNote } = this.context; 
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${note.id}`}>
            {note.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={() => this.deleteNoteRequest(note.id, deleteNote, history)}>
          Delete
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            {/* <span className='Date'>
              {format(props.modified, 'Do MMM YYYY')}
            </span> */}
          </div>
        </div>
      </div>
)
  }
  
}