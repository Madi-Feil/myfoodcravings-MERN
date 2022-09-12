import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditRecipe = (props) => {
    const { id } = useParams();
    const [recipeName, setRecipeName] = useState("");
    const [duration, setDuration] = useState("");
    const [ingrediants, setIngrediants] = useState("");
    const [chefName, setChefName] = useState("");
    const [chefNote, setChefNote] = useState("");
    const [instructions, setInstructions] = useState("");
    const[errors, setErrors] = useState("");
    const navigate = useNavigate();
    const [recipeNotFoundError, setRecipeNotFoundError] = useState("");
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
        setRecipeNotFoundError(`Recipe not found using that ID`);
    });
}, []);

const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .put(`http://localhost:8000/api/food/${id}`, {recipeName, duration, ingrediants, chefName, chefNote, instructions})
    .then((response) => { 
        console.log(response);
        navigate("/");
    })
    .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
    });
};

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/food/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="container">
            <header>Edit recipe: {recipeName}</header>
            <Link to="/" className="links">return to recipes</Link>
            <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="recipeName" className="edit">Recipe name: </label>
                            <input 
                                type="text" 
                                className="form-input" 
                                onChange={(e) => setRecipeName(e.target.value)} 
                                value={recipeName}
                            />
                            {errors.recipeName ? <p>{errors.recipeName.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration" className="edit">Duration: </label>
                            <input type="text" className="form-input" onChange={(e) => setDuration(e.target.value)} value={duration}/>
                            {errors.duration ? <p>{errors.duration.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingrediants" className="edit">Ingrediants: </label>
                            <input type="text" className="form-input" onChange={(e) => setIngrediants(e.target.value)} value={ingrediants}/>
                            {errors.ingrediants ? <p>{errors.ingrediants.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="chefName" className="edit">Chef name: </label>
                            <input type="text" className="form-input" onChange={(e) => setChefName(e.target.value)} value={chefName}/>
                            {errors.chefName ? <p>{errors.chefName.message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="chefNotes" className="edit">Chef notes: </label>
                            <input type="text" className="form-input" onChange={(e) => setChefNote(e.target.value)} value={chefNote}/>
                            {errors.chefNote ? <p>{errors.chefNote.message}</p>: null}
                        </div>
                        <div className="instructions">
                            <label htmlFor="instructions" className="edit">Instructions: </label>
                            <textarea className="form-input" onChange={(e) => setInstructions(e.target.value)} value={instructions}/>
                            {errors.instructions ? <p>{errors.instructions.message}</p>: null}
                        </div>
                        <button className="btn" type="submit" link to = "/">Save changes</button>

                        <button onClick={() => deleteHandler(recipeName.id)} className="delete-btn" navigate to = "/">Delete</button>
            </form>
        </div>
    )
}

export default EditRecipe;