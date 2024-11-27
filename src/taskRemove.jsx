import React from 'react'
import { Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import './btn.css'

function DeleteTask({getdata, props}) {

    /////////////DELETE/////////////
  async function delete1(taskid, _id) {
    let option = {
      method: "DELETE"
    }
    let deleteApi = `http://localhost:5000/task/${taskid}` /// for postgres
    // let deleteApi = `http://localhost:5000/task/${_id}`    /// for mongodb
    let res = await fetch(deleteApi, option)
    let result = await res.json()
    console.log(result)
    toast("✔ One Task Removed")
    getdata()
  }
  return (
    <div>
      <Toaster /> 
         <Button className='button-22' onClick={()=>delete1(props)} variant="outline-danger">Delete</Button>
    </div>
  )
}

export default DeleteTask