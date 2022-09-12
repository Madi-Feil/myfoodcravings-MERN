import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const DisplayAllRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    useEffect(() => {
        axios
        .get("http://localhost:8000/api/food")
        .then((response) => {
            console.log(response.data);
            setAllRecipes(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <header>My Food Cravings</header>
                <Link to="recipe/new" className="links">add your recipe</Link>
                
                <div className="table">
                    <thead>
                        <tr>
                            <th scope="col">Recipes</th>
                            <th scope="col">Chef</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allRecipes.map((food, index) => {
                            return (
                                <tr key={food._id}>
                                    <td>{food.recipeName}</td>
                                    <td>{food.chefName}</td> 
                                    <th>
                                        <Link to = {`/view/${food._id}`}>
                                            <button className="button">view</button>
                                        </Link>
                                    </th>
                                    <th>
                                        <Link to = {`/edit/${food._id}`}>
                                            <button className="button">edit</button>
                                        </Link>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </div>
            </div>
        </div>
    )
}

export default DisplayAllRecipes;