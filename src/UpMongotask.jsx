import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

function UpMongotask({ getdata, props }) {
    /////////////PUT//////////////
    let [UpdateTask, setUpdate] = useState("")
    let [newdue, setNewdue] = useState("")
    let [newCompdate, setCompDate] = useState("")
    let [UpdateStatus, setStatus] = useState("")
    console.log(props, "a")
    ///////////////UPDATE//////////////////
    async function editTask(_id) {
        let editApi = `http://localhost:5000/task/${_id}`;
        let editTask = {
            task: UpdateTask,
            duedate: newdue,
            compdate: newCompdate,
            status: UpdateStatus
        }
        let option = {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "accept": "application/Json",
                "Content-Type": "application/Json"
            }
        }
        let response = await fetch(editApi, option)
        let res = await response.json();
        console.log(res)
        getdata()
        handleClose()
        call()

    }
    /////////update fn/////////
    function update(task, duedate, compdate, status) {
        setUpdate(task)
        setNewdue(duedate)
        setCompDate(compdate)
        setStatus(status)
        handleShow()

    }

    const call =()=>{toast.success(
        `Changes Saved Succefully
              ${props.task}
         You have To Complete This on ${props.compdate}`,
        {
          duration: 6000,
        })}

    ///////////////modal////////////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Toaster /> 
            <Button className='button-41' onClick={() => { update(props.task, props.duedate, props.compdate, props.status) }} style={{ marginLeft: '10px'}} variant="dark" size="sm">Edit Task</Button>
            <div>
                <Modal style={{ zIndex: '2000' }} show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasictext">
                                <Form.Label>Task</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter A Task" value={UpdateTask} onChange={(e) => setUpdate(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicd">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Assign Date" value={newdue} onChange={(e) => setNewdue(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicd">
                                <Form.Label>Completion date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Completion Date" value={newCompdate} onChange={(e) => setCompDate(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formGridsyallabus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select defaultValue="Choose..." value={UpdateStatus} onChange={(e) => setStatus(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                    
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { editTask(props._id) }}>
                            Save Task
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </div>
    )
}

export default UpMongotask