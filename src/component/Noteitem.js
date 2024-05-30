import React, {useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const context = useContext(noteContext);
    const{deleteNote}=context;
   const{note,updateNote} = props
  console.log('Noteitem props:', { note, updateNote });
  return (
    <div className='col-md-10 my-3'>
    <div className="card my-3" >
    <div className="card-body my-3">
    <div className='d-flex align-item-center'>
      <h5 className="card-title">{note.title}</h5>
      <i className="fa-solid fa-trash mx-1 "onClick={()=>{deleteNote(note._id );}} ></i>
      <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note)}}></i></div>
      <p className="card-text">{note.description}</p>
      </div>
    
  </div></div>
  )
}

export default Noteitem