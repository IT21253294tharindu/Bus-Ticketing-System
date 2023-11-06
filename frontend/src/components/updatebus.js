
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import TManager_Header from "./TManager_Header";


export default function Busupdate() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [showModal, setShowModal] = useState(true);
    const [allbuses, setallbuses] = useState([
        
        {
            _id: 1,
            busno: 'Bus A',
            routeno: '001',
            routename: 'Route 1',
            Driver: "nimal",
            contactno: "0764587254"





        },
        {
            _id: 2,
            busno: 'Bus B',
            routeno: '002',
            routename: 'Route 2',
            Driver: "sunil",
            contactno: "0715452105"



        }


    ]);
    
    const [busdetails, setbusdetails] = useState({
        busno:'',
        routeno:'',
        routename:'',
        driver:'',
        contact:''
    });


    {/*useEffect(() => {

       axios.get(`` + id).then((res) => {
            setbusdetails(res.data);
        }).catch((err) => {
            console.log(err);
        })

    }, [id])

*/}
    function updatedata(e) {
        e.preventDefault();




        // axios.put(`update/`+id,busdetails).then(() => {  
        toast.success('bus Updated Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });


        const timer = setTimeout(() => {
            navigate('/buses/');
        }, 2000);
        return () => clearTimeout(timer);

        {/* }).catch((err) => {
        alert(err);
         })
        */}
    }

    return (
        <><TManager_Header />
            {showModal && (
                <div
                    className="modal show"
                    style={{ display: 'block', position: "fixed", marginTop: "150px", background: "linear-gradient(to right, #60758a, lightblue)", boxShadow: "5px 2px 2px #5555" }}
                >
                    <Modal.Dialog >

                        <Modal.Header closeButton onClick={() => { setShowModal(false); navigate('/buses/'); }}>
                            <Modal.Title>Bus Details</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{ background: "lightblue" }}>

                            {/*bus registration form */}
                            <Form style={{ padding: "5px", marginTop: "10%", color: "black", marginLeft: "2%", marginRight: "2%", marginBottom: "5%" }}>

                                <Form.Group as={Col} controlId="Busno">
                                    <Form.Label>Bus No</Form.Label>
                                    <Form.Control type="text" placeholder="Bus No" value={busdetails.busno} required onChange={(e) => { setbusdetails({ ...busdetails.busno }) }} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="RouteNo">
                                    <Form.Label>Route No</Form.Label>
                                    <Form.Select defaultValue={busdetails.routeno} required onChange={(e) => { setbusdetails({ ...busdetails.routeno }) }}>
                                        <option>choose...</option>
                                        {allbuses.map((item) => (
                                            <option key={item._id}>{item.routeno}</option>
                                        ))}

                                    </Form.Select>
                                </Form.Group>

                                

                                <Form.Group as={Col} controlId="driver">
                                    <Form.Label>Driver</Form.Label>
                                    <Form.Control type="text" placeholder="Driver name" value={busdetails.driver} required onChange={(e) => { setbusdetails({ ...busdetails.driver }) }} /> {/*driver name input field */}
                                </Form.Group>


                                <Form.Group as={Col} controlId="phoneno">
                                    <Form.Label>Contact no</Form.Label>
                                    <Form.Control type="tel" placeholder="Contact no" value={busdetails.contact} required onChange={(e) => { setbusdetails({ ...busdetails.contact }) }} />{/*driver's contact no input field */}
                                </Form.Group>


                                <Button variant="success" onClick={updatedata} style={{ alignContent: "center", alignItems: "center", marginLeft: "40%", marginTop: "5%" }}>
                                    Update
                                </Button>



                            </Form>


                        </Modal.Body>

                        <Modal.Footer>




                        </Modal.Footer>

                    </Modal.Dialog>


                </div>
            )}
            <ToastContainer />



        </>
    );

}