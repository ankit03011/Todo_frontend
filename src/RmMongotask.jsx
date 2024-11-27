import React from 'react'
import { Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import './btn.css'

function RmMongotask({getdata, props}) {
console.log(props._id)
    /////////////DELETE/////////////
  async function delete1( _id) {
    let option = {
      method: "DELETE"
    }
    let deleteApi = `http://localhost:5000/task/${_id}`    /// for mongodb
    let res = await fetch(deleteApi, option)
    let result = await res.json()
    console.log(result)
    toast("✔ One Task Removed")
    getdata()
  }
  return (
    <div>
      <Toaster /> 
         <Button className='button-22' onClick={()=>delete1(props._id)} variant="danger" size="sm">Delete</Button>
    </div>
  )
}

export default RmMongotask