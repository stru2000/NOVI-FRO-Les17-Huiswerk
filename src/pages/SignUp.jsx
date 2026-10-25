
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputUsername, setInputUsername] = useState('');

    const navigate = useNavigate();
    const controllerRef = useRef(null);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        // Annuleer een eventueel eerder registratieverzoek.
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        console.log('Register', inputEmail, inputUsername);

        try {
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/users',
                {
                    email: inputEmail,
                    password: inputPassword,
                    roles: [ 'user' ]
                },
                {
                    headers: {
                        'novi-education-project-id': 'c5a4b4d1-3095-4ef9-a5e3-a07a267533c6',
                    },
                    signal: controller.signal,
                }
            );

            console.log('Registratie response:', response);

            navigate('/signin');
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Het registratieverzoek is geannuleerd.');
            } else {
                console.error('Fout bij het registreren:', error);
            }
        }
    }

    return (
        <>
            <h1>Registreren</h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aspernatur atque consectetur, dolore eaque eligendi harum,
                numquam, placeat quisquam repellat rerum suscipit ullam vitae.
                A ab ad assumenda, consequuntur deserunt doloremque ea eveniet
                facere fuga illum in numquam quia reiciendis rem sequi tenetur
                veniam?
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

                <label htmlFor="username">Gebruikersnaam</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                />

                <button type="submit">Registreren</button>
            </form>

            <p>
                Heb je al een account? Je kunt je{' '}
                <Link to="/signin">hier</Link> inloggen.
            </p>
        </>
    );
}

export default SignUp;
