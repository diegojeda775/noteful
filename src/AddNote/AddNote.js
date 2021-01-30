//import { closestIndexTo } from 'date-fns/esm';
import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';


export default class AddNote extends Component{

    static contextType = NotesContext;

    constructor(props){
        super(props);
        this.state = {
          title:{
              value: '',
              touched: false,
          },
          content: {
            value: '',
            touched: false,
        },
          folderId: '',
          modified: '',
          noteId: '',
          error: null,
        }
      }

    handleSubmit = e => {
        e.preventDefault();
        
        const note = {
            id: this.state.noteId,
            name: this.state.title.value,
            modified: this.state.modified,
            folderId: this.state.folderId,
            content: this.state.content.value,
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
            this.setState({
                title:{
                    value: '',
                    touched: false
                },
                folderId:'',
                noteId:'',
                modified:'',
                content:{
                    value: '',
                    touched: false
                },
            })
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
        this.updateModified();
    }

    handleNoteId(id) {
        this.setState({
            noteId: id
        })
    }

    updateTitle(ttl){
        const formatedTitle = ttl[0].toUpperCase() + ttl.slice(1).toLowerCase()
        this.setState({
            title: {
                value: formatedTitle,
                touched: true
            }
        })
    }

    updateFolderId(id){
        this.setState({
            folderId: id
        })
    }
    
    updateContent(cont){
        this.setState({
            content: {
                value: cont,
                touched: true
            }
        })
    }

    updateModified(){
        let today = new Date();
        this.setState({
            modified: today,
        })
    }

    validateContent(){
        const content = this.state.content.value.trim();
        if (content.length === 0) {
          return "Content is required";
        } 
    }
    
    validateTitle() {
        const title = this.state.title.value.trim();
        if (title.length === 0) {
          return "Title is required";
        } 
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
                            onChange={e => this.updateTitle(e.target.value)}
                            required
                        />
                        {this.state.title.touched &&
                      (<ValidationError message={this.validateTitle()}/>)}
                    </div>
                    <div>
                        <lable htmlFor='fId'>Pick a Folder:{' '}</lable>
                        <select 
                            id='fId'
                            name='fId'
                            value={this.state.folderId}
                            onChange={e => this.updateFolderId(e.target.value)}
                            required
                        >
                            <option value=''>...Select a folder</option>
                            {this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)}
                        </select>
                        
                    </div>
                    <div>
                        <label htmlFor='content'>Content:{' '}</label>
                        <textarea 
                            id='content'
                            name='content'
                            onChange={e => this.updateContent(e.target.value)}
                            required
                        />
                        {this.state.content.touched &&
                      (<ValidationError message={this.validateContent()}/>)}
                    </div>
                    <div>
                        <button type='button' onClick={this.handleCancel}>Cancel</button>
                        <button type='submint'
                        disabled={this.validateTitle() || this.validateContent()}>
                            Save
                        </button>

                    </div>
                </form>
            </div>
        )
    }
}