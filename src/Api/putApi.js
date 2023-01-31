import axios from "axios";


export const fetchEditUser = async (id, editUser, token, dispatch, setUserEdit,) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/edituser/${id}`, {
        method: "PATCH",
        body: JSON.stringify(editUser),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    if (data) {
        dispatch(setUserEdit(editUser))
    }
}



//DEBERIAMOS BORRAR ESTE FETCH?
export const fetchUserEdited = async (id, editUser) => {
    try {
        await axios.put(`http://localhost:4000/users/${id}`, editUser);
    } catch (error) {
        console.log(error)
    }
}

export const fetchAddPlaylist = async (playlistAdded) => {
    try {
        await axios.put(`http://localhost:4000/playlists/${playlistAdded.id}`, playlistAdded)
    } catch (error) {
        console.log(error);
    }
}

// export const fetchPutUser = async (_id, userEdited, dispatch) => {
//     try {
//         await axios.put(`http://localhost:4000/users/${_id}`, userEdited);
//         await dispatch(setNewPassword(userEdited));
//     } catch (error) { console.log(error) }
// }