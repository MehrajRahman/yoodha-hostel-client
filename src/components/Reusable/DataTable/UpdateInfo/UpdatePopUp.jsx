import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../../../App";
import { toast } from "react-toastify";

import axios from "axios";
function ModalComponent(props) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [data, setData] = useState({ ...props.data });

  const handleClose = (e) => {
    e.preventDefault();
    props.setModalShow(false);
  };

  const handleChange = (event, name) => {
    const values = { ...data };

    values[name] = event.target.value;
    setData({ ...values });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    var bodyFormData = new FormData();
    props.heading.map((header) => {
      console.log(data[header.field]);
      bodyFormData.append("${header.field}", data[header.field]);
    });
    bodyFormData.append("id", data.id);
    
    console.log( `${process.env.REACT_APP_SERVER_LINK}${props.api}${data.id}/`)

    try {
      const res = await axios({
        // method: "put",
        method: "put",

        url: `${process.env.REACT_APP_SERVER_LINK}${props.api}${data.id}/`,
        // url: `http://127.0.0.1:8000/member/api/family/information/${data.id}/`,
        data: data,
        headers: {
          Authorization: `Bearer ${loggedInUser.login}`,
          username: `${loggedInUser.name}`,
          ipAddress: ` ${localStorage.ip} `,
          countryCode: ` ${localStorage.country} `,
        },
      });

      console.log(res.data);

      let items = props.ItemsData.filter((item) => item.id != data.id);
      console.log(items);
      props.setItemsData([res.data, ...items]);
      props.setItem && props.setItem([res.data, ...items]);
      console.log(data.id);
      props.setModalShow(false);
      toast.success("Info Updated", { positon: toast.POSITION.TOP_LEFT });
    } catch (error) {
      console.log(error);
      toast.warn("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={(e) => handleClose(e)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <table className="w-100 mt-4">
              {props.heading?.map((header, index) => {
                return (
                  <tr key={index}>
                    <th className="table-head">{header.name} </th>
                    <td>
                      {header.dropdown ? (
                        <select
                          className="form-control"
                          onChange={(e) => handleChange(e, header.field)}
                        >
                          {header.dropdown.map((cb) => (
                            <option
                              key={cb.id}
                              value={cb.value}
                              selected={cb.value === data[header.field]}
                            >
                              {cb.value}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={header?.type}
                          className="form-control"
                          value={data[header.field]}
                          onChange={(e) => handleChange(e, header.field)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className="d-flex justify-content-end m-1">
              <button
                type="submit"
                className="btn btn-secondary text-right m-2"
              >
                {" "}
                Update{" "}
              </button>

              <button
                className="btn btn-secondary text-right m-2"
                onClick={(e) => handleClose(e)}
              >
                {" "}
                Close{" "}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.setShow}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
