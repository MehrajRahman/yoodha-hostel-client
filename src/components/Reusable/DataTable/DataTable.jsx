import React, { useEffect, useState, useMemo, useContext } from "react";
import Search from "./Search";
import { Dropdown, Button } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import axios from "axios";

import TableHeader from "./Header";
import Pagination from "./Pagination";
import ModalComponent from "./UpdateInfo/UpdatePopUp";
import "./dataTable.css";

// import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CloudFogFill } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
// import { Toast } from "react-toastify/dist/components";

const DataTable = ({
  headers,
  items,
  action,
  deleteAPI,
  updateAPI,
  setItem,
}) => {
  // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [ItemsData, setItemsData] = useState([...items]);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const history = useNavigate();
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(20);
  const [num, setNum] = useState(null);
  const [itemsDatas, setItemsDatas] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [updateInfo, setUpdateInfo] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setItemsData([...items]);
  }, [items]);

  const itemsData = useMemo(() => {
    let computeditems = ItemsData;

    if (search) {
      computeditems = ItemsData.map((item, index) => {
        let data = [];
        let dat = null;
        headers.map((heading) => {
          if (heading.type !== "String") {
            if (
              item[heading.field]
                ?.toString()
                ?.toLowerCase()
                ?.includes(search.toLowerCase())
            ) {
              dat = item;
            }
          } else {
            if (
              item[heading.field]?.toLowerCase().includes(search?.toLowerCase())
            ) {
              dat = item;
            }
          }

          if (dat) {
            data.push(dat);
          }
        });

        return dat;
      });

      computeditems = computeditems.filter((item) => item != null);
    }

    setTotalItems(computeditems.length);

    //Sorting items
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computeditems = computeditems.sort(
        (a, b) =>
          reversed *
          a[sorting.field]
            ?.toString()
            .localeCompare(b[sorting.field]?.toString())
      );
    }

    //Current Page slice
    return computeditems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [items, ItemsData, currentPage, search, sorting]);

  useEffect(() => {
    setItemsDatas(itemsData);
  }, [itemsData]);

  const handleDelete = async (id) => {
    console.log(`${process.env.REACT_APP_SERVER_LINK}${deleteAPI}:${id}/`);
    try {
      const res = await axios({
        method: "delete",
        url: ` ${process.env.REACT_APP_SERVER_LINK}${deleteAPI}/${id}`,

        // headers: {
        //   // Authorization: `Bearer ${loggedInUser.login}`,
        //   // username: `${loggedInUser.name}`,
        //   // ipAddress: ` ${localStorage.ip} `,
        //   // countryCode: ` ${localStorage.country} `,
        // },
      });
      let data = ItemsData.filter((item) => item._id != id);
      setItemsDatas(data);
      setItemsData([...data]);
      setItem && setItem([...data]);
      toast.error("Info Deleted", { positon: toast.POSITION.TOP_LEFT });
      toast.error("info deleted")
      console.log("deleted")
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
    }
  };

  const updateHandler = async (item) => {
    console.log(item);

    await setUpdateInfo(item);
    await setModalShow(true);
  };

  const handleChange = (event, name) => {
    const values = { ...updateInfo };

    values[name] = event.target.value;
    setUpdateInfo({ ...values });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER_LINK}${deleteAPI}/${updateInfo._id}`,
        data: JSON.stringify(updateInfo),
        headers: {
          "content-type":"application/json"
          // Authorization: `Bearer ${loggedInUser.login}`,
          // username: `${loggedInUser.name}`,
          // ipAddress: ` ${localStorage.ip} `,
          // countryCode: ` ${localStorage.country} `,
        },

        
      });

      console.log(res.data);
      let items = ItemsData.filter((item) => item._id !== updateInfo._id);
      console.log(items);
      setItemsData([updateInfo, ...items]);
      setItem([updateInfo, ...items]);

      setModalShow(false);
      setShow(false);
      toast.success("Info Updated", { positon: toast.POSITION.TOP_LEFT });
    } catch (error) {
      console.log(error);
      toast.warn("Something Went Wrong", { positon: toast.POSITION.TOP_LEFT });
    }
  };

  const handleActionChange = (e, item) => {
    e.preventDefault();
    console.log(item);
    if (e.target.value === "edit") {
      setUpdateInfo(item);
      handleShow();
    }
    if (e.target.value === "view") {
    }
    if (e.target.value === "delete") {
      handleDelete(item?._id);
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="row  ">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-3 d-flex flex-row align-item-center ">
              <Modal
                show={show}
                onHide={handleClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={submitHandler}>
                    <table className="w-100 mt-4">
                      {headers.map((header, index) => {
                        return (
                          <tr key={index}>
                            <th className="table-head">{header.name} </th>
                            <td>
                              {header.dropdown ? (
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    handleChange(e, header.field)
                                  }
                                >
                                  {header.dropdown.map((cb) => (
                                    <option
                                      key={cb._id}
                                      value={cb.value}
                                      selected={
                                        cb.value === updateInfo[header.field]
                                      }
                                    >
                                      {cb.value}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={header?.type}
                                  className="form-control"
                                  value={updateInfo[header.field]}
                                  onChange={(e) =>
                                    handleChange(e, header.field)
                                  }
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

                      {/* <button
                        className="btn btn-secondary text-right m-2"
                        onClick={() => setShow(false)}
                      >
                        {" "}
                        Close{" "}
                      </button> */}
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
              <>
                {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}
              </>
              {/* <label htmlFor="select" className="d-block" >Number of Entries </label>
                          <select name="select" id="" className="d-block" >
                              <option value="10" onClick={()=>{setITEMS_PER_PAGE(10);setNum(5)}} >10</option>
                              <option value="20"  selected onClick={()=>console.log("clicked")} >20</option>
                              <option value="30" onClick={()=>setITEMS_PER_PAGE(30)}>30</option>
                              
                              </select>  */}
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex flex-row-reverse">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="w-100 mt-4 table">
              <TableHeader
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
                action={action}
              />
              <tbody className="table-body">
                {itemsDatas?.map(
                  (item, index) =>
                    item && (
                      <tr key={item?._id}>
                        <td scope="row">{index + 1}</td>
                        {headers.map((heading) => {
                          return <td scope="row">{item[heading.field]}</td>;
                        })}

                        {action && (
                          <td scope="row">
                            <div className="d-flex justify-content-center position-relative">
                              <div className="position-absolute">
                                <select
                                  className="option-click"
                                  onChange={(e) => handleActionChange(e, item)}
                                  display="none"
                                >
                                  <option
                                    value=""
                                    disabled
                                    selected
                                    hidden
                                  ></option>
                                  <option value="edit">Edit</option>

                                  <option value="delete">Delete</option>
                                </select>
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => {
              page == 0 ? setCurrentPage(page + 1) : setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
