import React, { useContext, useRef } from 'react'
import noteContext from '../contextApi/notes/noteContext';

function Noteitem(props) {
  const context = useContext(noteContext)
  const { deleteNote } = context;

  const deleteNoteRef = useRef(null)

  const deleteNoteFunc = () => {
    deleteNoteRef.current.click()

  }
  const { note, upDatenote } = props
  return (
    <>

      <button ref={deleteNoteRef} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5><strong>Are You Sure You Want to Delete This Note?</strong></h5>
              <p><strong>DISCLAIMER: </strong>Deleted Note won't be recover!</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" onClick={()=>{deleteNote(note._id); props.showAlert('Note Deleted Sucessfully', "success")}} data-bs-dismiss="modal">Delete Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="card p-1 m-2 col-md-3 hoverClass"   >
        <div className="card-body ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p><i className="fa-solid fa-tag">&nbsp;</i>{note.tag}</p>
          <i className="fa-solid fa-trash mx-2 " onClick={() => {
            deleteNoteFunc();
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { upDatenote(note) }}></i>

        </div>
      </div>
    </>
  )
}

export default Noteitem