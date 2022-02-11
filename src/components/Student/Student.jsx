import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";

import "./Student.css";
import { toast } from "react-toastify";
import DataTable from "../Reusable/DataTable/DataTable";
import Appbar from "../Reusable/Appbar/Appbar";

const Student = () => {
  const [items, setItems] = useState([])
  const fullNameRef = useRef();
  const rollRef = useRef();
  const ageRef = useRef();
  const hallRef = useRef();
  const ClassRef = useRef();
  const statusRef = useRef();
  const sIdRef = useRef();

  const headers = [
    {
      name: "Name",
      field: "name",
      sortable: true,
    },
    {
      name: "Student ID",
      field: "sId",
      sortable: true,
    },
    {
      name: "Roll",
      field: "roll",
      sortable: true,
    },
    {
      name: "Age",
      field: "age",
      sortable: true,
    },
    {
      name: "Hall",
      field: "hall",
      sortable: true,
    },
    {
      name: "Status",
      field: "status",
      sortable: true,
    },
    
  ];


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_LINK}/student`)
    .then(res=>res.json()
    .then(data=>setItems(data)))
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("foodname", fullNameRef.current.value);
    formData.append("foodprice", rollRef.current.value);
    const student = {
      name:fullNameRef.current.value,
      sId: sIdRef.current.value,
      roll:rollRef.current.value,
      age: ageRef.current.value,
      hall: hallRef.current.value,
      class: ClassRef.current.value,
      status: statusRef.current.value,


    }

   

    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_LINK}/student`,
        data: JSON.stringify(student),
        headers:{
          "content-type":"application/json"
        },      
      });
      toast.success("New Meetings Created");
      setItems([student, ...items]);
      // setNewDataFlag(!newDataFlag);
      console.log(res.data);
      // fullNameRef.current.value = "";
      // rollRef.current.value = "";

    } catch (error) {
      // toast.warn("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
      console.log(error);
    }
  };

  return (
   <div>
        <Appbar></Appbar>
      <div className="p-5">
      <h1> Add a new Student </h1>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">Student Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                ref={fullNameRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">Student ID</Form.Label>
              <Form.Control
                type="number"
                // placeholder="Enter Class"
                ref={sIdRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Roll</Form.Label>
              <Form.Control type="number" placeholder="Roll " ref={rollRef} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">Student Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Class"
                ref={ClassRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Age " ref={ageRef} />
            </Form.Group>
          </Col>

         
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">Student Hall</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Class"
                ref={hallRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <select
                required
                id="addd"
                className="form-control"
                ref={statusRef}
              >
                <option value="active">Active</option>
                <option value="inActive">inActive</option>
              </select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Add A New Student
        </Button>
      </Form>

      <DataTable
              headers={headers}
              items={items}
              action
              deleteAPI={"/student"}
              setItem={setItems}
            />
    </div>
   </div>
  );
};

export default Student;
