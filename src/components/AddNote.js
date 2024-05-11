import React,{useContext,useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note,setNote]=useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    props.showAlert("Note added successfully","success")
    setNote({title:"",description:"",tag:""});
  }

  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={handleChange}
              minLength={3}
              required
              name="title"
              value={note.title}
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
              name="description"
              id="description"
              value={note.description}
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
              value={note.tag}
              className="form-control"
              name="tag"
              id="tag"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={note.title.length<3 || note.description.length<5}
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
