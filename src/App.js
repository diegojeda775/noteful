import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
//import dummyStore from './dummy-store';
import Header from './Header/Header';
import FolderListNav from './FolderListNav/FolderListNav';
import NoteList from './NoteList/NoteList.js';
import NoteMain from './NoteMain/NoteMain';
//import {getNotesForFolder, findNote, findFolder} from './note-helpers';
import BackButton from './BackButton/BackButton';
import NoteNav from './NoteNav/NoteNav';
import NotesContext from './NotesContext';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';



class App extends Component {
  state={
    folders: [],
    notes: [],
    error: null,
  }

  setInfoState = (folders, notes) => {
    const _notes = notes.map(note => {
      return {
        ...note,
        modified: new Date(note.modified)
      }
    })
    this.setState({
      folders,
      notes: _notes,
      error: null,
    })
  }


  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note],
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter( nt => 
      nt.id !== noteId
      )
    this.setState({
      notes: newNotes,
    })
  }

  componentDidMount() {
    fetch('http://localhost:9090/db', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(res => {
        this.setInfoState(res.folders,res.notes)
      })
      .catch(error => this.setState( { error }))
  }

  render(){

    const contexValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    };

    return (
      <div className="App">
        <NotesContext.Provider value={contexValue}>
          <Header />
          <nav className="Nav-Folders">

            {['/','/folder/:folderId'].map(pth =>
              <Route
                key={pth}
                exact
                path={pth}
                component={FolderListNav}
              />
            )}
            
            <Route
              path='/note/:noteId'
              component={NoteNav}
            />
            <Route path='/add-folder' render={() => <BackButton />} />
            <Route path='/add-note' render={() => <BackButton />} />
          </nav>
          <main>

            {['/','/folder/:folderId'].map(pth =>
              <Route
                key={pth}
                exact
                path={pth}
                component={NoteList}
              />
            )}

            <Route
                path='/note/:noteId'
                component={NoteMain}
            />

            <Route
              path='/add-folder'
              component={AddFolder}
            />

            <Route
              path='/add-note'
              component={AddNote} 
            />

          </main>
        </NotesContext.Provider>
      </div>
    );
  }
}

export default App;
