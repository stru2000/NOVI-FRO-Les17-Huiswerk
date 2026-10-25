
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Profile() {
    const data = useContext(AuthContext);
    const [secrets, setSecrets] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function getSecrets() {
            try {
                const token = localStorage.getItem('token');

                const secretResponse = await axios.get(
                    'https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets',
                    {
                        headers: {
                            'novi-education-project-id': 'c5a4b4d1-3095-4ef9-a5e3-a07a267533c6',
                            Authorization: `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                );

                console.log('Profile - Data uit secrets:', secretResponse);

                setSecrets(secretResponse.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Het ophalen van de geheimen is geannuleerd.');
                } else {
                    console.error('Fout bij het ophalen van de geheimen:', error);
                }
            }
        }
        console.log('UserData uit Profile',data);
        getSecrets();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <h1>Profielpagina</h1>

            <section>
                <h2>Gegevens</h2>

                <p>
                    <strong>Gebruikersnaam:</strong> WIP
                </p>

                <p>
                    <strong>Email:</strong> {data.user.email}
                </p>
            </section>

            <section>
                <h2>Strikt geheime profiel-content</h2>

                {secrets.map((secret) => (
                    <div key={secret.id}>
                        <h3>{secret.title}</h3>
                        <p>{secret.content}</p>
                    </div>
                ))}
            </section>

            <p>
                Terug naar de <Link to="/">Homepagina</Link>
            </p>
        </>
    );
}

export default Profile;
