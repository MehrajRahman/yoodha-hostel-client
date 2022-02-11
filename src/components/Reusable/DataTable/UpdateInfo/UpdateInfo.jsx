import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'

// import Sidebar from "../../Sidebar/Sidebar";
import Appbar from "../../Appbar/Appbar";

function UpdateInfo() {
  const location = useLocation();
  const [heading, sethHeading] = useState([]);
  const [data, setData] = useState({});
  const [api, setApi] = useState(null)
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    console.log(location.state);
    sethHeading(location?.state?.headers);
    setData(location?.state?.item);
    setApi(location?.state?.api)
  }, [location]);


 const handleChange = (event,name) => {
   const values = data
   console.log(values)

values[name]= event.target.value;
   setData({...values})
 }

const submitHandler = async(e) =>{
    e.preventDefault();
    console.log(data)
    try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_LINK}${api}${data.id}`)
    } catch (error) {
        console.log(error)
    }
}
  return (
    <>
      <div className="districtInfo">
        <Appbar></Appbar>

        <div className="row">
          <div className="col-xl-2 col-l-3 col-md-4 col-sm-6 ">
            {/* <Sidebar></Sidebar> */}
          </div>
          <div className="col-xl-5 col-l-9 col-md-8  col-sm-12  p-1 mt-4">
            <h2>Update Data </h2>
            <form onSubmit={(e)=>submitHandler(e)}> 
              <table className="w-100 mt-4">
                {heading?.map((header, index) => {
                  return (
                    <tr key={index}>
                      <th className="table-head">{header.name} </th>
                      <td>
                        {" "}
                        <input
                          type={header?.type}
                          className="form-control"
                          value={data[header.field]}
                          onChange={(e)=>handleChange(e,header.field)}
                        />{" "}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <div className="d-flex justify-content-end m-1">
                <button type="submit" className="btn btn-secondary text-right">
                  {" "}
                  Update{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateInfo;
