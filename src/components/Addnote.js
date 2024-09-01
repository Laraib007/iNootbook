import React, { useContext, useState } from 'react'
import noteContext from '../contextApi/notes/noteContext';



const Addnote = (props) => {
    const context = useContext(noteContext)
  const {addNote} = context;

    const [Note, setNote] = useState({title: "", description: "", tag: ""})

  const handleSubmit=(e)=>{
    e.preventDefault()
    addNote(Note.title, Note.description, Note.tag)
    setNote({ title: "", description: "", tag: ""})
    props.showAlert('Note Added Sucessfully', "success")
  }
  const onChange = (e)=>{
    setNote({...Note, [e.target.name]: e.target.value})
  } 



  return (
    <div style={{marginTop:"6rem"}}>
       <h1>This is My iNotebook</h1>

<h2>Add a New Note</h2>
<form className=' text-start'>
  <div className="form-group ">
    <label className='my-1' htmlFor="exampleInputEmail1">Title<span style={{color: 'red'}}>*</span></label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" value={Note.title}  onChange={onChange} />
  </div>
  <div className="form-group">
    <label className='my-1' htmlFor="exampleInputPassword1">Description<span style={{color: 'red'}}>*</span></label>
    <input type="text" className="form-control" id="description" name="description" placeholder="description"  value={Note.description} onChange={onChange} />
  </div>
  <div className="form-group ">
    <label className='my-1' htmlFor="exampleInputEmail1">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" value={Note.tag}  onChange={onChange} />
  </div>
  <button disabled={Note.title.length<5 || Note.description.length<5 } type="submit" className="btn btn-primary my-3" onClick={handleSubmit}>Add Note</button>
</form>
    </div>
  )
}

export default Addnote
