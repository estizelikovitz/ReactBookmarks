import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';



const Bookmark = ({ bookmark, deleteClick, editClick, editMode, updateClick, cancelClick, onTitleChange }) => {

    const { title, url, id } = bookmark;
    //const [editMode, setEditMode] = useState(false);

    //useEffect(() => {
    //    { console.log(editIds.includes(id)) }
    //    {console.log(editIds)}
    //    if (editIds.includes(id)) {
    //        setEditMode(true);
    //    }
    //}, []);

    return (
        <>
            <tr>
                {editMode && <td> <input type="text" className="form-control" placeholder="Title" value={title} onChange={onTitleChange}/></td>}
                {!editMode && <td>{title}</td>}

                <td>
                    <a href={url} target="_blank">
                    {url}
                    </a>
                </td>
                {!editMode &&
                    <td>
                        <button className="btn btn-success" onClick={editClick}>Edit Title</button>
                        <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={deleteClick}>Delete</button>
                    </td>
                }
                {editMode &&
                    <td>
                    <button className="btn btn-warning" onClick={updateClick}>Update</button>
                    <button className="btn btn-info" onClick={cancelClick}>Cancel</button>
                    <button className="btn btn-danger" style={{marginLeft:10}}  onClick={deleteClick}>Delete</button>
                    </td>
                }
            </tr>
        </>
    )
}


export default Bookmark;