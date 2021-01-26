import React, { Component } from 'react';
import BackButton from '../BackButton/BackButton';
import NotesContext from '../NotesContext';
import { findNote, findFolder } from '../note-helpers';


export default class NoteNav extends Component {
    static contextType = NotesContext;
    render(){
        const {noteId} = this.props.match.params;
        const note = findNote(this.context.notes, noteId) || {};
        const folder = findFolder(this.context.folders, note.folderId);
        return(
            <div className='Note-Nav'>
                <BackButton />
                {folder && (
                    <h3 className='Note-Nave-Folder'>
                        {folder.name}
                    </h3>
                )}
            </div>
        );
    }
}