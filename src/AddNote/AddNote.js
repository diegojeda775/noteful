//import { closestIndexTo } from 'date-fns/esm';
import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import NotesContext from '../NotesContext';

export default class AddNote extends Component{
    static contextType = NotesContext;
    
    state = {
        error: null,
        noteId: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        const { title, fId, content } = e.target;
        // const id = this.state.noteId;
        const note = {
            id: this.state.noteId,
            name: title.value,
            folderId: fId.value,
            content: content.value,
        }
        fetch('http://localhost:9090/notes/', {
      method: 'POST',
      body: JSON.stringify(note),
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
        title.value = ''
        fId.value = ''
        content.value = '' 
        this.context.addNote(note);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({error})
      })


    }

    handleCancel = () => {
        this.props.history.push('/')
    }

    componentDidMount() {
        this.handleNoteId(this.props.location.key);
    }

    handleNoteId(id) {
        this.setState({
            noteId: id
        })
    }

    
    

    render(){
        const { error } = this.state;
        return(
            <div className='Add-Folder-'>
                <h3>Add Note to Folder</h3>
                <form 
                    className='Add-Folder-Form'
                    onSubmit={this.handleSubmit}
                >
                    <div className="error">
                         {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>Title:{' '}</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            required
                        />
                    </div>
                    <div>
                        <lable htmlFor='fId'>Pick a Folder:{' '}</lable>
                        <select 
                            id='fId'
                            name='fId'
                            required
                        >
                            <option value='none'>...Select a folder</option>
                            {this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='content'>Content:{' '}</label>
                        <textarea 
                            id='content'
                            name='content'
                            required
                        />
                    </div>
                    <div>
                        <button type='button' onClick={this.handleCancel}>Cancel</button>
                        <button type='submint'>Save</button>

                    </div>
                </form>
            </div>
        )
    }
}