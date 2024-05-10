import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const refClose=useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
  }

  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

  }

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
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
                    id="etitle"
                    value={note.etitle}
                    onChange={handleChange}
                    minLength={3}
                    required
                    name="etitle"
                    aria-describedby="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="edescription"
                    value={note.edescription}
                    id="edescription"
                    onChange={handleChange}
                    minLength={5}
                    required
                    style={{ height: "10vh", paddingTop: "0px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    name="etag"
                    id="etag"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        <div className="container mx-1">
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;