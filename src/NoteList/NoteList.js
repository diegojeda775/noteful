import React, { Component } from 'react';
import Note from '../Note/Note';
import {getNotesForFolder} from '../note-helpers';
import NotesContext from '../NotesContext';
import ErrorBoundry from '../ErrorBoundry';



export default class NoteList extends Component {
    static contextType = NotesContext;

    render(){
        const history = this.props.history;
        const {folderId} = this.props.match.params;
        const notesForFolder = getNotesForFolder(
                                this.context.notes,
                                folderId
                            );
        return <div className='Folder-Note-Lists'>
            <ul className="Folders__List">
                {notesForFolder.map(note => 
                    <li key={note.id}>
                        <ErrorBoundry>
                            <Note
                                {...note}
                            />    
                        </ErrorBoundry>
                    </li>)
                }
            </ul>
            <div className="Nav-btn">
            <button type='button' onClick={() => history.push('/add-note')} className='add-note'>Add Note</button>
            </div>
        </div>

    }

}