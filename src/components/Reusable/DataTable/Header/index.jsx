import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CaretUp, CaretDown, CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import './heading.css'
const Header = ({ headers, onSorting ,action}) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead className="tableHead">
            <tr>
                <th className="table-head">No.</th>
                {headers.map(({ name, field, sortable }) => (
                    <th
                        className="table-head"
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >

                        <div className="d-flex justify-content-center"> {name}
                            <div className="caret-container">
                                {sortingField && sortingField === field ? (



                                    sortingOrder === "asc" ? <div className="d-flex">
                                        <div >
                                            <CaretUpFill className="up-fill"  />
                                        </div>
                                    </div>
                                        : <div className="d-flex">
                                            <div >
                                                <CaretDownFill className="down-fill" /> </div>
                                        </div>



                                ) : <>     <CaretUp className="up-icon" /><CaretDown />  </>
                                }
                            </div>
                        </div>



                    </th>
                ))}
                { action &&  <th className="table-head">Actions</th> }
            </tr>
        </thead>
    );
};

export default Header;
