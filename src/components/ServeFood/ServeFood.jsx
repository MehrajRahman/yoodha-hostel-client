import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Appbar from "../Reusable/Appbar/Appbar";
import axios from "axios";

import { toast } from "react-toastify";
import "./ServeFood.css"
import { SdCardFill } from "react-bootstrap-icons";

const ServeFood = () => {
  const [items, setItems] = useState([]);
  const [foods, setFoods] = useState([]);
  const [serveList, setServeList] = useState([]);
  const [id, setId] = useState();
  const roll = useRef();
  const shiftRef = useRef();
  const statusRef = useRef();
  const foodRef = useRef();
  const dateRef = useRef();
  const [foodList,setFoodList] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_LINK}/student`).then((res) =>
      res.json().then((data) => setItems(data))
    );
    fetch(`${process.env.REACT_APP_SERVER_LINK}/food`)
        .then(res=>res.json()
        .then(data=>setFoods(data)))
    fetch(`${process.env.REACT_APP_SERVER_LINK}/serveFood`)
        .then(res=>res.json()
        .then(data=>setServeList(data)))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(e.target.value === "1"){
console.log(dateRef.current.value,)
      
         const student = await
      items &&
      items.filter((st) => Number(st.roll) === Number(roll.current.value));
      // setId(student._id)
        const newServed  = {
            studentId : student[0].sId,
            date: dateRef.current.value,
            shift: shiftRef.current.value,
            status: statusRef.current.value,
            food: foodList,

            


        }

        console.log(newServed, student);

        if(  (serveList.length > 0 && serveList.filter(sb=> sb.date === String(dateRef.current.value )&& String(sb.shift) === String(shiftRef.current.value) && String(sb.studentId) === String(student[0].sId) )).length>0   ){
// alert("Already Served")
// toast.error("already added")
alert("Already Served")

        }
        else{
          try {
            const res = await axios({
              method: "post",
              url: `${process.env.REACT_APP_SERVER_LINK}/serveFood`,
              data: JSON.stringify(newServed),
              headers:{
                "content-type":"application/json"
              },      
            });
            toast.success("New Meetings Created");
            setServeList([newServed, ...serveList]);
            // setNewDataFlag(!newDataFlag);
            console.log(res.data);
            // fullNameRef.current.value = "";
            // rollRef.current.value = "";
      
          } catch (error) {
            // toast.warn("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
            console.log(error);
          }
        }

        
    }
    // const student =
    //   items &&
    //   items.filter((st) => Number(st.roll) === Number(roll.current.value));
    // //   items.map(st=>console.log(st.roll))
    // console.log(student);

    // setStudent(student);
  };
  const handleClassificationChange = (e, value) => {
    console.log(e.target.value, value);
    let foodd = [];
    let food = [];
    value.length > 0 && value.map(cd =>  {
         const name = cd.name;
         foodd.push(name)
         
     })
     console.log(foodd)
    setFoodList(foodd);
  };

  const handleChange = (e)=>{
    const student =
    items &&
    items.filter((st) => Number(st.roll) === Number(roll.current.value));
    setId(student.sId);
  }
  return (
    <div>
      <Appbar></Appbar>

      <div className="p-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label className="text-start">Student Roll</Form.Label>
                <select
                  name="designation"
                  className=" me-sm-2 form-control"
                  id="inlineFormCustomSelect"
                  onChange={ handleChange}
                  ref={roll}
                  required
                >
                  <option value="" selected>
                    Select Roll
                  </option>
                  {
                    items.length > 0 &&
                      items.map((cb) => (
                        <option value={cb.roll}>{cb.roll}</option>
                      ))
                  }
                </select>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Shift</Form.Label>
              <select
                required
                id="addd"
                className="form-control"
                ref={shiftRef}>
                <option value="1">Day</option>
                <option value="0">Night</option>
              </select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="text-start">Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Class"
                ref={dateRef}
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label className="text-start">Student Roll</Form.Label>
                {/* <select
                  name="designation"
                  className=" me-sm-2 form-control"
                  id="inlineFormCustomSelect"
                  onChange={(e) => handleChange(e)}
                  ref={foodRef}
                  required
                >
                
                  {
                    foods.length > 0 &&
                      foods.map((cb) => (
                        <option value={cb.name}>{cb.name}</option>
                      ))
                  }
                </select> */}
                    {/* <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={foods}
                      sx={{ width: "100%", padding: "0px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Foods" />
                      )}
                      getOptionLabel={(option) =>
                        `${option.name}`
                      }
                      onChange={(event, value) =>
                        handleClassificationChange(event, value)
                      }
                      requried
                    /> */}

<Autocomplete
        multiple
        id="tags-outlined"
        options={foods}
        getOptionLabel={(option) => option.name}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        
        onChange={(event, value) =>
            handleClassificationChange(event, value)
          }
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
           
            
          />
         
        )}

         
      />

{/* <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={foods}
                      sx={{ width: "100%", padding: "0px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Classification(*)" />
                      )}
                      getOptionLabel={(option) =>
                        `${option.name}`
                      }
                      onChange={(event, value) =>
                        handleClassificationChange(event, value)
                      }
                      requried
                    /> */}


              </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Staus</Form.Label>
              <select
                required
                id="addd"
                className="form-control"
                onChange={handleSubmit}
                ref={statusRef}>

                <option value="0">Not Served</option>
                <option value="1">Served</option>
              </select>
            </Form.Group>
          </Col>
          </Row>

          {/* <Button variant="primary" type="submit">
            Search Student
          </Button> */}
        </Form>

        <div className="d-flex">
        {
          serveList.map(sb=> 
            <div className="col-lg-3 col-md-4 col-sm-6  p-3 m-1 foodContainer">
              <h3>Food Name: {sb.food[0]}</h3>
              <h4>Student ID: {sb.studentId}</h4>
              <p>Date: {sb.date}</p>
              <p>Shift: {sb.shift === "0" ? "Day": "Night"}</p>
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default ServeFood;
