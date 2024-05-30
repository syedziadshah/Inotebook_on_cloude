import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();}
    else{
      navigate("/login");
    }
  }, [getNotes]);
  const ref = useRef(null);
  const refclose=useRef(null)
  const[note ,setNote]=useState({etitle:"",edescription:"",etag:""})

  const updateNote = (currentnote) => {
    ref.current.click()
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description ,etag:currentnote.tag})
    // You can perform any actions related to updating the note here
  };

 
  const handleClick=(e)=>{
    console.log("updating the note ....", note)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click()
    props.showAlert("Updated successfully", "success");
 
}
const onchange=(e)=>{
 setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Demo Model
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle" value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchange} minLength={5}required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="edescription" value={note.edescription}
                    onChange={onchange} minLength={5}required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="etag " value={note.etag}
                    onChange={onchange} minLength={5}required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<=5|| note.edescription.length<=5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container my-2">
        {notes.length===0 && "No notes to display"}</div>
        <div className="row">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className="col-md-4" key={note._id}>
                <Noteitem note={note} updateNote={updateNote} />
              </div>
            ))
          ):("") 
          }
        </div>
      </div>
    </>
  );
};

export default Notes;
