
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import './Student.scss';
import SidebarStudent from '../Sidebar/SidebarStudent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Addstudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import { toast } from 'react-toastify';
function Student(props) {
    const [state, setState] = useState({ ListUsers: [] });
    const [modal, setModal] = useState(false);
    const [editStudent, setEditstudent] = useState({ StudentEdit: {} })
    const [modalEdit, setModalEdit] = useState(false);
    const toggleEdit = () => setModalEdit(!modalEdit);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/Student`);
            setState({
                ListUsers: res.data ? res.data : []
            })
        }
        fetchMyAPI()
    }, [])
    const createNewStudent = async (data) => {
        try {
            console.log('check data child: ', data)
            let res = await axios.post(`https://localhost:7184/Student`, data);
            console.log('response create student: ', res)
            setModal(false);
            toast.success("Add new student success");
        } catch (error) {
            toast.error("Add new student fail")
            console.log('check data from child: ', data)
        }
    }
    const handleEditstudent = (data) => {
        console.log("check item :", data);
        toggleEdit()
        setEditstudent({
            StudentEdit: data
        })
        console.log("check edit student: ", editStudent.StudentEdit);
    }
    const UpdateStudentId = async (data) => {
        console.log('check updateUser: ', data)
        try {
            let res = await axios.put(`https://localhost:7184/Student/${data.id}`, data);
            console.log('response create user: ', res)
            toggleEdit()
            toast.success("Update success");
        } catch (error) {
            toast.error("Update don't success");
            console.log(error)
        }
        console.log('check data from child: ', data)
    }
    let history = useHistory()
    const handleViewDetailUser = (student) => {
        history.replace(`/DetailStaff/${student.id}`)
    }
    const handleDeleteStudent = async (data) => {
        console.log('check status: ', data.status)
        try {
            let res = await axios.put(`https://localhost:7184/api/Manager/${data.id}`, {
                lastName: data.lastName,
                firstName: data.firstName,
                dateOfBirth: data.dateOfBirth,
                email: data.email,
                identiFyCardNumber: data.identiFyCardNumber,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender: data.gender,
                idCard: data.idCard,
                status: false
            });
            console.log('response create user: ', res)
            toast.success("Delete success")
        } catch (error) {
            toast.error("Delete don't success")
            console.log(error)
        }
    }
    return (
        <>
            {/* <NavStudent /> */}
            <SidebarStudent />
            <div class="section row">
                <h3 class="col-12">Danh sách sinh viên</h3>
                <button style={{ marginLeft: "auto" }} class="col-2 mb-2 btn btn-primary pull-right mr-5" onClick={toggle}>Thêm sinh viên</button>
                <Addstudent
                    modal={modal}
                    toggle={toggle}
                    createNewStudent={createNewStudent}
                />
                {
                    modalEdit &&
                    <UpdateStudent
                        modal={modalEdit}
                        toggle={toggleEdit}
                        currentUser={editStudent}
                        UpdateStudent={UpdateStudentId}
                    />
                }
                <div id="collapse1" class="col-12">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">Gender</th>
                                <th scope="col">PhoneNumber</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.ListUsers && state.ListUsers.length > 0 &&
                                state.ListUsers.map((item, index) => {
                                    return (
                                        <tr className="child" key={item.id}>
                                            {/* <td>{index + 1}</td> */}
                                            <td onClick={() => handleViewDetailUser(item)}>{item.id}</td>
                                            <td onClick={() => handleViewDetailUser(item)}>{item.firstName}</td>
                                            <td onClick={() => handleViewDetailUser(item)}>{item.gender ? "Nam" : "Nữ"}</td>
                                            <td onClick={() => handleViewDetailUser(item)}>{item.phoneNumber}</td>
                                            <td onClick={() => handleViewDetailUser(item)}>{item.status ? <div class="text-success">True</div> : <div class="text-danger">false</div>}</td>
                                            <td>
                                                <button class="btn btn-success" onClick={() => handleEditstudent(item)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                <button class="btn btn-danger" onClick={() => handleDeleteStudent(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="clear-fix">
            </div>
        </>
    )
}


export default Student;