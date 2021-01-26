import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from '../NotesContext';


export default class FolderListNav extends Component{
    static contextType = NotesContext;
    
    render(){
        const { folders } = this.context;
        const history = this.props.history;

        return<>
            <ul className="Folders__List">
                {folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink 
                            className="Folder-list-Nav"
                            to={`/folder/${folder.id}`}>
                            {folder.name}
                        </NavLink>
                    </li>)
                }
            </ul>
            <div className="Nav-btn">
                <button onClick={() => history.push('/add-folder')} type="button" className="Nav-Add-Btn">Add Folder</button>
            </div>
        </>;
    }

}