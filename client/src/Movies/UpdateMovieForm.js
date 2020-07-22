import React , {useState , useEffect} from 'react'
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from 'axios';


const initialFormValues ={

    title: "",
    director: "",
    metascore:"",
    stars: [""]
}

function  UpdateMovieForm (props) {
 const location = useLocation();
 const {push} = useHistory();
 const params = useParams()
const [movie  , setMovie] = useState(initialFormValues)

useEffect (() => {
    if(location.state){
        setMovie(location.state)
    } else {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => setMovie(res.data))
        .catch( err => console.log(err))
    }
},[]) 

const changeHandler = ev => {
    ev.persist()
    let value = ev.target.value;
    setMovie({
        ...movie,
        [ev.target.name]: value
    })
}

const handleSubmit = e => {
    e.preventDefault();

    axios
    .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then( res => {
        props.setMovieList(res.data)
        push('')
       
    } )
    .catch( err => console.log(err))
}


    return (
        <div>
         <form onSubmit={handleSubmit}>
            <input
            type='text'
            name='title'
            value={movie.title}
            onChange={changeHandler}
            />
            <input
            type='text'
            name='director'
            value={movie.director}
            onChange={changeHandler}
            />
            <input
            type='number'
            name='metascore'
            value={movie.metascore}
            onChange={changeHandler}
            />
            <input
            type='string'
            name='stars'
            value={movie.stars}
            onChange={changeHandler}
            />
            <button>Update</button>
        </form>  
        </div>
    )
}

export default UpdateMovieForm;