import React, { useState, useCallback } from 'react';
import noteContext from './noteContext';
import { json } from 'react-router-dom';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = useCallback(async () => {
    //call api to fetch notes from the data base
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {  // Added missing slash
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') // Replace with actual token
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }, []);

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') // Replace with actual token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log(json)
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    //call Api to delete the not
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') // Replace with actual token
      }
    });
    const json =  response.json()
    console.log(json);
    console.log ("deleting the node with the id"+id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    //call api to edit not notes
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')// Replace with actual token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.map(note => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    // to export the function
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
