import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './taskRemove';
import RmMongotask from './RmMongotask';
import UpMongotask from './UpMongotask';

function MainComp() {
    let [Task, setTask] = useState([])
    //////////////Get////////////
    async function getdata() {
        let result = await axios('http://localhost:5000/task')
        console.log(result.data)
        setTask(result.data)

    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div className='bg'>
            <div className='contain'>
                <Navbar className=" justify-content-between bg-nav ">
                    <Container >
                        <AddTask getdata={getdata} />
                    </Container>
                </Navbar>
                <div className='tb padd table-responsive' style={{ maxHeight: '85%', overflowY: 'auto' }}>
                    <MDBTable align='middle' bordered small >
                        <MDBTableHead dark style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                            <tr style={{ textAlign: 'center' }}>
                                <th>S.NO</th>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Completion Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                Task.map((e, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{e.task}</td>
                                                <td>{moment(e.duedate).format('DD-MM-YYYY')}</td>
                                                <td>{moment(e.compdate).format('DD-MM-YYYY')}</td>
                                                {/* <td>{e.compdate}</td> */}
                                                <td>{e.status}</td>
                                                {/* <td><button type="button" class="btn btn-outline-success" onClick={() => { update(e.task_details, e.task_id, e.comp_data, e.state) }}><GrEdit /></button></td> */}
                                                <td style={{ display: 'flex', justifyContent: 'end' }}>
                                                    {/* <DeleteTask getdata={getdata} props={e.taskid} /> */}
                                                    <RmMongotask getdata={getdata} props={e}/>
                                                    {/* <UpdateTask getdata={getdata} props={e} /> */}
                                                    <UpMongotask getdata={getdata} props={e}/>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </MDBTableBody>
                    </MDBTable>

                </div>
            </div>
        </div>
    )
}

export default MainComp