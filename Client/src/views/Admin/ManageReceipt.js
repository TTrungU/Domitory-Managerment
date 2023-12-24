
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import AddReceipt from './AddReceipt';
import UpdateReceipt from './UpdateReceipt';
function ManageReceipt(props) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);
    const [ListReceipt, setListReceipt] = useState([]);
    const [CurrentReceipt, setCurrentReceipt] = useState({});
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/ElectricWaterLog`);
            setListReceipt(
                res.data
            )
        }
        fetchMyAPI()
    }, [])
    const createNewReceipt = async (id, data) => {
        console.log('check id and data from parent: ', id, data)
        try {
            let res = await axios.post(`https://localhost:7184/ElectricWaterLog?roomId=${id}`, data);
            console.log('response create receipt: ', res)
            setModal(false);
            toast.success("Thêm hóa đơn thành công");
        } catch (error) {
            toast.error("Thêm hóa đơn thất bại")
            console.log('check data from child: ', data)
        }
    }
    const handleUpdateReceipt = async (item) => {
        toggleEdit()
        setCurrentReceipt(
            item
        )
        // console.log("check edit receipt in parent: ", CurrentReceipt);
    }
    const UpdateDataReceipt = async (data) => {
        console.log("check data from parent: ", data)
        try {
            let res = await axios.put(`https://localhost:7184/ElectricWaterLog/${data.ElectricWaterLogId}?RoomId=${data.RoomId}`, data);
            console.log('response create receipt: ', res)
            setModalEdit(false);
            toast.success("Cập nhật hóa đơn thành công");
        } catch (error) {
            toast.error("Cập nhật hóa đơn thất bại")
            console.log('check data from child: ', data)
        }
    }
    const handleDeleteReceipt = async (data) => {
        console.log("check data delete: ", data)
        try {
            let res = await axios.put(`https://localhost:7184/ElectricWaterLog/${data.id}?RoomId=${data.room.id}`, {
                electricNew: data.electricNew,
                electricOld: data.electricOld,
                waterOld: data.waterOld,
                waterNew: data.waterNew,
                feeStatus: false
            });
            console.log('response create receipt: ', res)
            setModalEdit(false);
            toast.success("Xóa hóa đơn thành công");
        } catch (error) {
            toast.error("Xóa hóa đơn thất bại")
            console.log('check data from child: ', data)
        }
    }
    return (
        <>
            <SidebarAdmin />
            <AddReceipt
                modal={modal}
                toggle={toggle}
                createNewReceipt={createNewReceipt}
            />
            {
                modalEdit &&
                <UpdateReceipt
                    modal={modalEdit}
                    toggle={toggleEdit}
                    CurrentReceipt={CurrentReceipt}
                    UpdateDataReceipt={UpdateDataReceipt}
                />
            }
            <div className="section">
                <h3 className="">QUẢN LÝ HÓA ĐƠN ĐIỆN NƯỚC</h3>
                <button style={{ marginLeft: "auto" }} className=" mb-2 btn btn-primary pull-right mr-5" onClick={toggle}>Thêm hóa đơn</button>
            </div>
            <div >
                <table className="table mt-5 w-75 shadow" >
                    <thead className="bg-light">
                        <tr className="border font-weight-bold">
                            <td>Phòng</td>
                            <td>Còn trống</td>
                            <td>Chỉ số điện</td>
                            <td>Chỉ Số nước</td>
                            <td>Tổng tiền</td>
                            <td>Trạng thái thanh toán</td>
                            <td>Sửa / xóa</td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {ListReceipt && ListReceipt.length > 0 &&
                            ListReceipt.map((item, index) => {
                                return (
                                    <tr key={item.id} className="border">
                                        <td>{item.room.name}</td>
                                        <td>{item.room.slotRemain}</td>
                                        <td>
                                            <div>Chỉ số đầu:  <span className="font-weight-bold">{item.electricNew} Kwh</span> </div>
                                            <div>Chỉ số cuối:  <span className="font-weight-bold">{item.electricOld} Kwh</span> </div>
                                            <div>Sử dụng:  <span className="font-weight-bold">{item.electricNew - item.electricOld} Kwh</span> </div>
                                            <div>Tiền điện:  <span className="font-weight-bold">{item.electricFee} VNĐ</span> </div>
                                        </td>
                                        <td>
                                            <div>Chỉ số đầu:  <span className="font-weight-bold">{item.waterNew} m<sup>3</sup></span></div>
                                            <div>Chỉ số cuối:<span className="font-weight-bold">{item.waterOld} m<sup>3</sup></span></div>
                                            <div>Sử dụng:  <span className="font-weight-bold">{item.waterNew - item.waterOld} m<sup>3</sup></span> </div>
                                            <div>Tiền nước:  <span className="font-weight-bold">{item.waterFee} VNĐ</span> </div>
                                        </td>
                                        <td>
                                            <div className="font-weight-bold ">{item.totalFee} VNĐ</div>
                                            <div>(4 sinh viên)</div>
                                        </td>
                                        <td>{item.feeStatus ? <div className="text-success">Đã thanh toán</div> : <div className="text-danger">Chưa thanh toán</div>}</td>
                                        <td>
                                            <button className="btn btn-success mr-1" onClick={() => handleUpdateReceipt(item)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteReceipt(item)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div className="clear-fix">
            </div>
        </>
    )
}


export default ManageReceipt;