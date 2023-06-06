import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookmark from '../Components/Bookmark';
import { useBookmarksContext } from '../BookmarksContext';
import { produce } from 'immer';



const MyBookmarks = (props) => {

    const { user } = useBookmarksContext();
    const { id, firstName, lastName } = user;
    const [bookmarks, setBookmarks] = useState([]);
    const [editIds, setEditIds] = useState([]);

    const getBookmarks = async () => {
        const { data } = await axios.get(`/api/bookmarks/getbookmarks?id=${id}`);
        setBookmarks(data);
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    const deleteClick = async (b) => {
        await axios.post(`/api/bookmarks/deletebookmark`, b);
        await getBookmarks();
    }

    const editClick = (b) => {
        const { id } = b;
        setEditIds([...editIds, id]);
    }
    const updateClick = async (b) => {
        await axios.post(`/api/bookmarks/updatebookmark`, b);
        await getBookmarks();
        const { id } = b;
        setEditIds(editIds.filter(i => i !== id));
    }
    const cancelClick = (b) => {
        const { id } = b;
        setEditIds(editIds.filter(i => i !== id));
    }
    const onTitleChange = (e,id) => {
        const newBookmarks = produce(bookmarks, draft => {
            const bookmark = draft.find(bm => bm.id === id);
            bookmark.title = e.target.value;
        });

        setBookmarks(newBookmarks);
    }

    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
                <div className="container">
                    <div style={{ marginTop: 20 }}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Welcome {firstName} {lastName}!</h1>
                                <Link to="/addbookmark">
                                    <button className="btn btn-primary btn-block">Add Bookmark</button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <table className="table table-hover table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>URL</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(editIds)}
                                    {bookmarks.map(b => <Bookmark bookmark={b}
                                        key={b.id}
                                        deleteClick={() => deleteClick(b)}
                                        editMode={editIds.includes(b.id)}
                                        editIds={editIds}
                                        editClick={() => editClick(b)}
                                        updateClick={() => updateClick(b)}
                                        cancelClick={() => cancelClick(b)}
                                        onTitleChange={e => onTitleChange(e,b.id)}
                                    />)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MyBookmarks;