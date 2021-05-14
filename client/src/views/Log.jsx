import React, {useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Log = props => {
    const [logForm, setLogForm] = useState({
        username:"",
        password:"",
    });
    const [errors, setErrors] = useState({
        username:"",
        password:"",
    });
    const handleInput = e => {
        setLogForm({
            ...logForm,
            [e.target.name]:e.target.value
        })
    }
    const handleLogin = e => {
        e.preventDefault();
        Axios({
            method: 'POST',
            url: 'http://localhost:8000/api/login/',
            withCredentials: false,
            crossdomain: true,
            data: JSON.stringify(logForm),
            headers:{"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res);
            if (res.data.token) {
                const token = res.data.token;
                localStorage.setItem('token', token);
                setTimeout(() => {
                    props.history.push("/home");
                })
            } else {
                setErrors(res.data)
                console.log(errors)
            }
        })
    }

    return (
        <div className="row">
            <div className="col-6 p-5 mx-auto">
                <div className="row">
                    <h2 className="mx-auto">Login</h2>
                </div>
                <form className="text-align-center" onSubmit={handleLogin}>
                    <label className="form-label">
                        Email:
                    </label>
                    <input type="text" name="username" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.username: ""}</p>
                    <label className="form-label">
                        Password:
                    </label>
                    <input type="password" name="password" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.password: ""}</p>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-auto">Login</button>
                    </div>
                </form>
                <div className="row">
                    <Link to="/" className="btn btn-secondary mx-auto mt-2">
                        Need an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Log;