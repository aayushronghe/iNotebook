import React,{useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(noteContext);
  const {deleteNote,editNote}=context;

  return (
    <div className="col-md-4 my-3">
      <div className="card w-75" style={{ display: "flex" }}>
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div
            className="delete mt-5 mb-2 mx-2"
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <i className="fa-solid fa-trash fa-xl" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square fa-xl" onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
