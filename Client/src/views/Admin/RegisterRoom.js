
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddregisRoom from './AddRegisRoom';
import UpdateRegister from './UpdateRegister';
function RegisterRoom(props) {
    const [state, setState] = useState({ ListRegisterRooms: [] });
    const [modal, setModal] = useState(false);
    const [editroom, setEditRoom] = useState({ RoomEdit: {} })
    const [CurrentRegister, setCurrentRegister] = useState({});
    const [modalEdit, setModalEdit] = useState(false);
    const [id, setId] = useState({
        idStudent: '',
        idRoom: ''
    })
    const toggleEdit = () => setModalEdit(!modalEdit);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/RegisterRoom`);
            setState({
                ListRegisterRooms: res.data ? res.data : []
            })
            console.log("check res get: ", res)
        }
        fetchMyAPI()
    }, [state.ListRegisterRooms])
    const createNewRegisRoom = async (data) => {
        try {
            let res = await axios.post(`https://localhost:7184/RegisterRoom`, data);
            console.log('response create staff: ', res)
            setModal(false);
            toast.success("Add new register success");
        } catch (error) {
            toast.error("Add new staff fail")
            console.log('check data from child: ', data)
        }
    }
    const handleIdRegisterRoom = (event, item) => {
        let copyId = { ...id }
        copyId[item] = event.target.value;
        setId({
            ...copyId
        })
    }
    const handleOnclickSearch = async () => {
        if (id.idRoom != "" && id.idStudent != "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idRoom}/${id.idStudent}`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }
        if (id.idRoom != "" && id.idStudent == "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idRoom}/room`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
                console.log("check res: ", res)
                console.log('check listResgisterRoom: ', state.ListRegisterRooms)
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }

        else if (id.idStudent != "" && id.idRoom == "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idStudent}/student`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
                console.log("check res: ", res)
                console.log('check listResgisterRoom: ', state.ListRegisterRooms)
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }
        else if (id.idStudent == "" && id.idRoom == "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }

    }
    const updateRegister = async (data) => {
        console.log('check updateUser in parent: ', data)
        try {
            let res = await axios.put(`https://localhost:7184/RegisterRoom/${data.id}`, data);
            console.log('response create user: ', res)
            toggleEdit()
            toast.success("Update success");
        } catch (error) {
            toast.error("Update don't success");
            console.log(error)
        }
        console.log('check data from child: ', data)
    }
    const handleUpdateRegister = (data) => {
        // alert("nghia")
        toggleEdit()
        setCurrentRegister(
            data
        )
        console.log("check edit Room register: ", CurrentRegister);
    }
    const handleDeleteRegister = async (data) => {
        try {
            let res = await axios.put(`https://localhost:7184/RegisterRoom/${data.id}`, {
                studentId: data.studentId,
                roomId: data.roomId,
                dateBegin: data.dateBegin,
                numberOfMonth: data.numberOfMonth,
                domitoryFeeStatus: data.domitoryFeeStatus,
                status: false,
            });
            // console.log('response create user: ', res)
            toast.success("Delete success");
        } catch (error) {
            toast.error("Delete don't success");
            console.log(error)
        }
    }
    let history = useHistory()
    const handleViewDetailUser = (id) => {
        history.replace(`/DetailStudent/${id}`)
    }

    function mouseOver(id) {
        document.getElementById(`${id}`).setAttribute("class", "font-weight-bold text-danger");
    }
    function mouseOut(id) {
        document.getElementById(`${id}`).setAttribute("class", "font-weight-bold text-primary");
    }
    return (
        <>
            <SidebarAdmin />
            <AddregisRoom
                modal={modal}
                toggle={toggle}
                createNewRegisRoom={createNewRegisRoom}
            />
            {
                modalEdit &&
                <UpdateRegister
                    modal={modalEdit}
                    toggle={toggleEdit}
                    CurrentRegister={CurrentRegister}
                    updateRegister={updateRegister}
                />
            }

            <div class="section row" >
                <h3 class="w-100" >Danh sách Đăng ký</h3>
                <nav class="navbar navbar-light  col-6 ml-5">
                    <div class="row ml-1">
                        <input class="col-3 form-control mr-sm-2 ml-3" type="search" placeholder="Id Student" aria-label="Search" value={id.idStudent} onChange={(event) => handleIdRegisterRoom(event, "idStudent")}></input>
                        <input class="col-3 form-control mr-sm-2" type="search" placeholder="Id Room" aria-label="Search" value={id.idRoom} onChange={(event) => handleIdRegisterRoom(event, "idRoom")}></input>
                        <button class="col-3 btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => handleOnclickSearch()}>Search</button>
                    </div>
                </nav>
                <button style={{ marginLeft: "auto" }} class="col-2 mb-2 btn btn-primary pull-right mr-5" onClick={toggle}>Đăng ký</button>
                <div class="ml-4 text-white">...</div>
                <div id="" class="align-item-center" style={{ "margin": "auto" }}>
                    <table class="table shadow w-100 " >
                        <thead>
                            <tr class="border bg-light " >
                                <th style={{ "font-size": "17px" }} >MASV</th>
                                <th style={{ "font-size": "17px" }}>MAP</th>
                                <th style={{ "font-size": "17px" }}>Ngày bắt đầu</th>
                                <th style={{ "font-size": "17px" }}>Ngày kết thúc</th>
                                <th style={{ "font-size": "17px" }}>Số tháng</th>
                                <th style={{ "font-size": "17px" }}>Số tiền</th>
                                <th style={{ "font-size": "17px" }}>Trạng thái tiền phòng</th>
                                <th style={{ "font-size": "17px" }}>Thời hạn</th>
                                <th style={{ "font-size": "17px" }}>Sửa / Hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.ListRegisterRooms && state.ListRegisterRooms.length > 0 &&
                                state.ListRegisterRooms.map((item, index) => {
                                    return (
                                        <tr className="child" key={item.id} class="border">
                                            <td class="font-weight-bold text-primary" style={{ "font-size": "17px" }} id={item.studentId} onMouseOut={() => mouseOut(item.studentId)} onMouseOver={() => mouseOver(item.studentId)} onClick={() => handleViewDetailUser(item.id)}>{item.studentId}</td>
                                            <td class="" style={{ "font-size": "17px" }} >{item.roomId}</td>

                                            {/* <td style={{ "font-size": "17px" }}>{item.dateBegin}</td> */}
                                            <td style={{ "font-size": "17px" }}>{moment(item.dateBegin).format("DD-MM-YYYY")}</td>
                                            <td style={{ "font-size": "17px" }} >{moment(item.dateEnd).format("DD-MM-YYYY")}</td>

                                            <td style={{ "font-size": "17px" }} >{item.numberOfMonth}</td>
                                            <td style={{ "font-size": "17px" }} >{item.domitoryFee} VNĐ</td>
                                            <td style={{ "font-size": "17px" }} >{item.domitoryFeeStatus ? <div class="text-success">Đã thanh toán</div> : <div class="text-danger">Chưa thanh toán</div>}</td>
                                            <td style={{ "font-size": "17px" }} >{item.status ? <div class="text-success">Còn hạn</div> : <div class="text-danger">Hết hạn</div>}</td>
                                            <td style={{ "font-size": "17px" }}>
                                                <button class="btn btn-success mr-1" onClick={() => handleUpdateRegister(item)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                <button class="btn btn-danger" onClick={() => handleDeleteRegister(item)}><i class="fa fa-calendar-times-o" aria-hidden="true"></i></button>
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


export default RegisterRoom;