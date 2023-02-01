import { useDispatch, useSelector } from 'react-redux';
import { BsFillPlayCircleFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../Card.css'
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedPlaylist } from '../../../helpers/functions/likeTrack';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PlaylistCard = ({ data, size, img }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);
    const navigate = useNavigate();

    const openSong = (data) => {
        navigate(`/playlist/${data._id}`)
    }
    const [myToken, setMyToken] = useState("")
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        async function getToken() {
            const token = await getAccessTokenSilently();
            setMyToken(prev => prev = token);
        }
        getToken();
    }, [getAccessTokenSilently])

    return (

        <div className='small'>
            {
                userData.isLogged ? <button className='btnheart btn' onClick={() => likedPlaylist(data, userData, myToken, dispatch)}>{
                    userData.userLogged.myplaylists.find((like) => like.id === data.id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                }</button> : ""
            }
            <button className='btn btnplay' onClick={() => setPlayer(data.tracks, dispatch, userData)}><BsFillPlayCircleFill /></button>

            <img onClick={() => openSong(data)} className={img} src={data.thumbnail} alt='img' />

            <div className="card-text imghover card-body mt-2">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.artist}</p>
            </div>
        </div>

    )
}

export default PlaylistCard