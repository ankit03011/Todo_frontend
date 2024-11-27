import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import './btn.css'

function AddTask({ getdata }) {
  ///////////POST///////////
  let [Task, setTask] = useState("")
  // let [CompDate, setCompDate] = useState("")

  ////////////POST/////////////
  let apiUrl2 = 'http://localhost:5000/task';
  async function saveData() {
    let userTask = {
      task: Task,
      // compdate: CompDate
    }
    let option = {
      method: "POST",
      body: JSON.stringify(userTask),
      headers: {
        "accept": "application/Json",
        "Content-Type": "application/Json"
      }
    }
    let response = await fetch(apiUrl2, option)
    let res = await response.json();
    console.log(res)
    getdata()
    handleClose()
    call(Task)

  }
  const call = (Task) => {
    toast.success(
      `Added New Task
     ${Task}`,
      {
        duration: 6000,
      }

    );
  }
  ///////////////modal////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Toaster />
      {/* <Button onClick={()=>{handleShow()}} variant="dark">Add Task</Button> */}
      <Button className='button-18' onClick={() => { handleShow() }}  size="sm">Add Task</Button>

      <div>
        <Modal style={{ zIndex: '2000' }} show={show} onHide={handleClose}>
<div className="modal-content" style={{  border: '10px groove lightyellow'}}>
          <Modal.Header closeButton style={{background:'lightyellow'}}>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasictext">
                <Form.Label>Task</Form.Label>
                <Form.Control as="textarea" placeholder="Enter Task" value={Task} onChange={(e) => setTask(e.target.value)} />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicd">
                                <Form.Label>Completion date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Completion Date" value={CompDate} onChange={(e) => setCompDate(e.target.value)} />
                            </Form.Group> */}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { saveData() }}>
              Save Task
            </Button>
          </Modal.Footer>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default AddTask