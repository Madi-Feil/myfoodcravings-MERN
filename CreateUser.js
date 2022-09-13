import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateUser = ( ) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/user", 
                {username, email, password, confirmPassword})
            .then((response) => {
                console.log(response);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login", 
                {username, password})
            .then((response) => {
                console.log(response);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    }

    return (
        <div className='container'>
            <header>My food cravings</header>

            <div className='user-form'>
                
                {/*registration */}

                <div className='registration'>
                    <h1>Create An Account:</h1>
                    <form onSubmit={handleSubmit} className='inputs'>
                        <div className='inputs'>
                            <label htmlFor='username'>Username: </label>
                            <input
                                type="text"
                                className='form-input'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                            {errors.username ? <p>{errors.username.message}</p> : null}
                        </div>

                        <div className='inputs'>
                            <label htmlFor='email'>Email: </label>
                            <input
                                type="text"
                                className='form-input'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {errors.email ? <p>{errors.email.message}</p> : null}
                        </div>

                        <div className='inputs'>
                            <label htmlFor='password'>Password: </label>
                            <input
                                type="text"
                                className='form-input'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            {errors.password ? <p>{errors.password.message}</p> : null}
                        </div>

                        <div className='inputs'>
                            <label htmlFor='confirmPassword'>Confirm Password: </label>
                            <input
                                type="text"
                                className='form-input'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                            {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : null}
                        </div>

                        {/* BUTTON TO SUBMIT FORM */}

                        <button className='login-btn' type="submit" Link to = '/home'>
                            Register
                        </button>
                    </form>
                </div>

                {/* login */}
                <div className='login'>
                    <h1>Login:</h1>
                    <form onSubmit={submitHandler} className='inputs'>
                        <div className='inputs'>
                                <label htmlFor='username'>Username: </label>
                                <input
                                    type="text"
                                    className='form-input'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username ? <p>{errors.username.message}</p> : null}
                            </div>

                            <div className='inputs'>
                                <label htmlFor='email'>Email: </label>
                                <input
                                    type="text"
                                    className='form-input'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email ? <p>{errors.email.message}</p> : null}
                            </div>
                            <Link className='login-btn' type="submit" Link to = "/home">Login</Link>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateUser;