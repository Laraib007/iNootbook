import React, { useContext } from 'react'
import noteContext from '../contextApi/notes/noteContext';

function notes() {
    
  const context = useContext(noteContext)
  const {notes, setNotes} = context;
  return (
    <div><h2>Your All Notes</h2>
    {notes.map((note)=>{
    return <div><h5>{note.title}</h5><p>{note.description}</p></div> 
    })}</div>
  )
}

export default notes