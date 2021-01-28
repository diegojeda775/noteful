import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';


export default class AddFolder extends Component{

    static contextType = NotesContext;

    constructor(props){
      super(props);
      this.state = {
        error: null,
        folderId: '',
        name: {
          value: '',
          touched: false,
        }
      }
    }
    

    handleSubmit = e => {
        e.preventDefault();
        const { name } = this.state.name.value;
        const folder = {
            id: this.state.folderId,
            name: name,
        }
        fetch('http://localhost:9090/folders/', {
      method: 'POST',
      body: JSON.stringify(folder),
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
        name.value = '';
      //  title.touched = ''
        this.context.addFolder(folder);
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
        this.handleFolderId(this.props.location.key);
    }

    handleFolderId(id) {
      this.setState({
          folderId: id
      })
    }

    updateName(name){
     const formatedName = name[0].toUpperCase() + name.slice(1).toLowerCase()
      this.setState({
        name: {
          value: formatedName,
          touched: true,
        }
      })
    }

    validateName() {
      const name = this.state.name.value;
      this.context.folders.forEach(folder => {
        if(folder.name === name){
          return `A folder named ${folder.name} already exists. Try another name.`
        }
      });
      if (name.length === 0) {
        return 'Name is required';}
      // } else if (confilctedName) {
      //   return `A folder with ${confilctedName} name already exists. Please input another name`;
      // }
      // return false;
    }
    

    render(){
        const { error } = this.state;
        return(
            <div className='Add-Folder-'>
                <h3>Create Folder</h3>
                <form 
                  className='Add-Folder-Form'
                  onSubmit={this.handleSubmit}
                >
                  <div className="error">
                        {error && <p>{error.message}</p>}
                  </div>
                  <div>
                      <label htmlFor='title'>Folder Name:{' '}</label>
                      <input
                          type='text'
                          name='title'
                          id='title'
                          onChange={e => this.updateName(e.target.value)}
                      />
                      {this.state.name.touched &&
                      (<ValidationError message={this.validateName()}/>)}
                  </div>
                  <div>
                      <button type='button' onClick={this.handleCancel}>Cancel</button>
                      <button type='submint'disabled={this.validateName()}>Save</button>

                  </div>
                </form>
            </div>
        )
    }
}