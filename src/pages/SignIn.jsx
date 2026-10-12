import React from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useContext,useState} from "react";

function SignIn() {
    const data = useContext(AuthContext);
    const [ inputEmail, setInputEmail ] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        setInputEmail();
        data.login(inputEmail);
    }


    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <p>*invoervelden*</p>
                <label htmlFor="email">E-mailadres</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={inputEmail}
                    onChange={e => setInputEmail(e.target.value)}/>
                <label htmlFor="password">Wachtwoord</label>
                <input type="password" id="password" name="password" />
                <button>Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;