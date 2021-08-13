import React, { useState } from 'react';
import { signup } from '../actions/auth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const {
        username,
        password,
        password2,
        first_name,
        last_name,
        email
    } = formData;

    const handleChange = (event) => setFormData({ ...formData, ...{ [event.target.name]: event.target.value } });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length > 3 && password === password2 && first_name.length > 0 && last_name.length > 0 && email.length > 0 && /.+@.+[.].+/.test(email)) {
            signup(username,
                password,
                password2,
                first_name,
                last_name,
                email);
            setSubmitted(true);
        }
    }

    if (submitted) {
        return <Redirect to="/" />
    }

    return <div className="container my-3 py-3 rounded bg-light">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-md-2 g-2">
                <div className="col">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="dummy" name="username" value={username} onChange={handleChange} required minLength="3" />
                        <label htmlFor="floatingInput">Username<i className="text-danger">*</i></label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="dummy" name="email" value={email} onChange={handleChange} required />
                        <label htmlFor="floatingInput">Email<i className="text-danger">*</i></label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="dummy" name="password" value={password} onChange={handleChange} required minLength="8" />
                        <label htmlFor="floatingInput">Password<i className="text-danger">*</i></label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="dummy" name="password2" value={password2} onChange={handleChange} required minLength="8" />
                        <label htmlFor="floatingInput">Confirm Password<i className="text-danger">*</i></label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="dummy" name="first_name" value={first_name} onChange={handleChange} required />
                        <label htmlFor="floatingInput">First Name<i className="text-danger">*</i></label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="dummy" name="last_name" value={last_name} onChange={handleChange} required />
                        <label htmlFor="floatingInput">Last Name<i className="text-danger">*</i></label>
                    </div>
                </div>
            </div>
            <div className="row mt-2"><div className="col text-center"><button type="submit" className="btn btn-success">Sign up</button></div></div>
            <div className="row mb-2"><div className="col"><Link to="/login">Login</Link></div></div>
        </form>
    </div>
}
export default connect(null,)(Signup);