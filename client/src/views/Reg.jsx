import React, {useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Reg = props => {
    const [regForm, setRegForm] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:"",
    });
    const [errors, setErrors] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:"",
    });
    const handleInput = e => {
        setRegForm({
            ...regForm,
            [e.target.name]:e.target.value
        })
    }
    const handleRegister = e => {
        e.preventDefault();
        Axios({
            method: 'POST',
            url: 'http://localhost:8000/api/register/',
            withCredentials: false,
            crossdomain: true,
            data: regForm,
        })
        .then(res => {
            if (res.data.response) {
                const token = res.data.token
                localStorage.setItem('token', token);
                props.history.push('/home');
            } else {
                setErrors(res.data);
            }
        })
    }

    return (
        <div className="row">
            <div className="col-6 p-5 mx-auto">
                <div className="row">
                    <h2 className="mx-auto">Create An Account</h2>
                </div>
                <form onSubmit={handleRegister} className="text-align-center">
                    <label className="form-label">
                        Email:
                    </label>
                    <input type="text" name="email" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.email: ""}</p>
                    <label className="form-label">
                        Username:
                    </label>
                    <input type="text" name="username" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.username: ""}</p>
                    <label className="form-label">
                        Password:
                    </label>
                    <input type="password" name="password" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.password: ""}</p>
                    <label className="form-label">
                        Password Confirmation:
                    </label>
                    <input type="password" name="confirm_password" onChange={handleInput} className="form-control"/>
                    <p className="text-danger">{errors ? errors.confirm_password: ""}</p>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-auto">Register</button>
                    </div>
                </form>
                <div className="row">
                    <Link to="/login" className="btn btn-secondary mx-auto mt-2">
                        Have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Reg;