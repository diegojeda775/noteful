import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {}, 
})

export default NotesContext;