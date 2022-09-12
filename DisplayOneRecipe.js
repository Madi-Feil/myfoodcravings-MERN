import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

const DisplayOneRecipe = () => {
    const { id } = useParams();
    const [recipeName, setRecipeName] = useState("");
    const [duration, setDuration] = useState("");
    const [ingrediants, setIngrediants] = useState("");
    const [chefName, setChefName] = useState("");
    const [chefNote, setChefNote] = useState("");
    const [instructions, setInstructions] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    console.log(id);

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/food/${id}`)
        .then((response) => {
            console.log(response.data);
            setRecipeName(response.data.recipeName);
            setDuration(response.data.duration);
            setIngrediants(response.data.ingrediants);
            setChefName(response.data.chefName);
            setChefNote(response.data.chefNote);
            setInstructions(response.data.instructions);
        })
        .catch((err) => {
            console.log(err.response);
            console.log("error while looking up id", err.response);
        });
    }, []);

    return (
        <div className="container">
            <header>{recipeName}</header>
            <Link to="/" className="links">return to recipes</Link>
            <div className="form">
                <div className="input">
                    <div><h3>Duration: {duration }</h3></div>
                </div>
                <div className="input">
                    <div><h3>Ingrediants: {ingrediants} </h3></div>
                </div>
                <div className="input">
                    <div><h3>Chef's name: {chefName}</h3></div>
                </div>
                <div className="input">
                    <div><h3>Chef's notes: {chefNote}</h3></div>
                </div>
                <div className="input">
                    <div><h3>Instructions: {instructions}</h3></div>
                </div>
            </div>
        </div>
    )
};

export default DisplayOneRecipe;