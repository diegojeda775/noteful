import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesContext from '../NotesContext';
import { findNote } from '../note-helpers';


export default class NoteMain extends Component {
  static contextType = NotesContext;
  render(){
    const {noteId} = this.props.match.params;
    const note = findNote(this.context.notes, noteId);
    return (
      <section className='NoteMain'>
        
        <Note
          id={noteId}
          name={note.name}
        />
        <div className='NoteMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}