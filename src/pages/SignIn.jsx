
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function SignIn() {
    const data = useContext(AuthContext);

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const controllerRef = useRef(null);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        // Annuleer een eventueel eerder loginrequest.
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/login',
                {
                    email: inputEmail,
                    password: inputPassword,
                },
                {
                    headers: {
                        'novi-education-project-id': 'c5a4b4d1-3095-4ef9-a5e3-a07a267533c6',
                    },
                    signal: controller.signal,
                }
            );

            console.log('Response POST:', response);

            await data.login(response.data.token);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Het loginrequest is geannuleerd.');
            } else {
                console.error('Fout bij het inloggen:', error);
            }
        }
    }

    return (
        <>
            <h1>Inloggen</h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?
            </p>

            <form onSubmit={handleSubmit}>
                <p>*invoervelden*</p>

                <label htmlFor="email">E-mailadres</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />

                <label htmlFor="password">Wachtwoord</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />

                <button type="submit">Inloggen</button>
            </form>

            <p>
                Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.
            </p>
        </>
    );
}

export default SignIn;
