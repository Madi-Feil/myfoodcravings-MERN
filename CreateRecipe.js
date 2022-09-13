import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const CreateRecipe = () => {
    const [recipeName, setRecipeName] = useState("");
    const [duration, setDuration] = useState("");
    const [ingrediants, setIngrediants] = useState("");
    const [chefName, setChefName] = useState("");
    const [chefNote, setChefNote] = useState("");
    const [instructions, setInstructions] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/food",
        { recipeName, chefNote, duration, ingrediants, instructions, chefName})
        .then((response) => {
            console.log(response);
            navigate("/home");
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        });
    };
     return (
         <div className="containter">
             <div className="row">
                 <header>Add your recipe</header>
                 <Link to ="/home" className="links">return to recipes</Link>
                 <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="form-group">
                            <label htmlFor="recipeName" className="edit">Recipe name: </label>
                            <input type="text" className="form-input" onChange={(e) => setRecipeName(e.target.value)} value={recipeName}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration" className="edit">Duration: </label>
                            <input type="text" className="form-input" onChange={(e) => setDuration(e.target.value)} value={duration}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingrediants" className="edit">Ingredients: </label>
                            <input type="text" className="form-input" onChange={(e) => setIngrediants(e.target.value)} value={ingrediants}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="chefName" className="edit">Chef name: </label>
                            <input type="text" className="form-input" onChange={(e) => setChefName(e.target.value)} value={chefName}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="chefNotes" className="edit">Chef notes: </label>
                            <input type="text" className="form-input" onChange={(e) => setChefNote(e.target.value)} value={chefNote}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <div className="instructions">
                            <label htmlFor="instructions" className="edit">Instructions: </label>
                            <textarea className="form-input" onChange={(e) => setInstructions(e.target.value)} value={instructions}/>
                            {errors.name ? <p>{errors.name.message}</p>: null}
                        </div>
                        <button className="btn" type="submit">add recipe to book</button>
                    </div>
                 </form>
             </div>
         </div>
     )
}

export default CreateRecipe;