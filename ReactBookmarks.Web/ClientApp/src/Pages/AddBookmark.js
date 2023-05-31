import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Link, useHistory } from 'react-router-dom';


const AddBookmark = () => {
    const [bookmark, setBookmark] = useState({ title: '', url: '' });
    const history = useHistory();
    const onTextChange = (e) => {
        const newBookmark = { ...bookmark };
        newBookmark[e.target.name] = e.target.value;
        setBookmark(newBookmark);
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        await axios.post('/api/bookmarks/addbookmark', bookmark);
        history.push('/mybookmarks');

    }

    const { title, url } = bookmark;

    return (

        <>
            <div >
                <br />
                <br />
                <br />
                <br />
                <div className="row" >
                    <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h3>Add Bookmark</h3>
                        <form onSubmit={onSubmitClick}>
                            <input type="text" value={title} name="title" placeholder="Title" className="form-control" onChange={onTextChange}/>
                        <br />
                            <input type="text" value={url} name="url" placeholder="Url" className="form-control" onChange={onTextChange}/>
                        <br />
                        <button className="btn btn-primary" >Add</button>
                    </form>
                </div>
                </div>
                </div>
        </>
    )
}
export default AddBookmark;