import React from 'react'
import { Link } from 'react-router-dom'
import NotesContext from '../NotesContext'
//import { format } from 'date-fns'

function deleteNoteRequest(noteId, callback){
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
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function Note(props) {
  return (
    <NotesContext.Consumer>
      {(context) => {
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${props.id}`}>
              {props.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button' onClick={() => {
            deleteNoteRequest(
              props.id, 
              context.deleteNote
              )
            }
          }>
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
      }}  
    </NotesContext.Consumer>
  )
}