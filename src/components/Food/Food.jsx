import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import "./Food.css";

import axios from "axios";
import DataTable from "../Reusable/DataTable/DataTable";
import { toast } from 'react-toastify';
import Appbar from '../Reusable/Appbar/Appbar';
import Header from '../Home/Header/Header';

const Food = () => {
  const [items, setItems] = useState([])
    const foodName = useRef();
    const foodPrice = useRef();

    // Fetch all Food;
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/food`)
        .then(res=>res.json()
        .then(data=>setItems(data)))
    }, []);

    const headers = [
      {
        name: "Food Name",
        field: "name",
        sortable: true,
      },
      {
        name: "Price",
        field: "price",
        sortable: true,
      },
    ];
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("foodname", foodName.current.value);
        formData.append("foodprice", foodPrice.current.value);

    const food = {name:foodName.current.value, price:foodPrice.current.value }

// console.log(process.env.REACT_APP_SERVER_LINK)
        try {
            const res = await axios({
              method: "post",
              url: `${process.env.REACT_APP_SERVER_LINK}/food`,
              data: JSON.stringify(food),
              headers:{
                "content-type":"application/json"
              },      
            });
            toast.success("New Meetings Created");
            setItems([food, ...items]);
            // setNewDataFlag(!newDataFlag);
            console.log(res.data);
            foodName.current.value = "";
            foodPrice.current.value = "";

          } catch (error) {
            // toast.warn("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
            console.log(error);
          }
        // fetch(`http://localhost:5000/addFood`,{
        //   method:"POST",
        //   // url: `${process.env.REACT_APP_SERVER_LINK}/addFood`,
          
        //       headers:{
        //         "content-type":"application/json"
        //       },
        //       body: formData,
             

        // })
        // .then(res=>res.json())
        // .then(data=>console.log(data))
    }


  return (
    <div className='foodAdd '>
      <Appbar></Appbar>
     
     <div className="p-5">
     <h1>  Add a new Food Items </h1>

<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Food Name</Form.Label>
<Form.Control type="text" placeholder="Enter Food"  ref={foodName} />

</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Food Price</Form.Label>
<Form.Control type="number" placeholder="Price " ref={foodPrice} />
</Form.Group>

<Button variant="primary" type="submit">
Submit
</Button>
</Form>
<DataTable
      headers={headers}
      items={items}
      action
      deleteAPI={"/food"}
      setItem={setItems}
    />
     </div>

    </div>


  )
}

export default Food