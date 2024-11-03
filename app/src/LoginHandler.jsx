import { useEffect } from 'react';
const clientID = import.meta.env.VITE_CLIENT_ID;
const redirectURI = import.meta.env.VITE_REDIRECT_URI;
const cognitoAuthEndpoint = import.meta.env.VITE_COGNITO_AUTH_ENDPOINT

const LoginHandler = () => {
    const exchangeCodeForToken = async (code) => {
        const response = await fetch(cognitoAuthEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: clientID,
                redirect_uri: redirectURI,
                code: code,
            }),
        });
    
        const data = await response.json();
        if (response.ok) {
            const accessToken = data.access_token; // Token dostępu
            localStorage.setItem('access_token', accessToken); // Zapisz token w localStorage
            console.log('Access Token:', accessToken);
            console.log(data)
        } else {
            console.error('Error exchanging code for token:', data);
        }
    };

    const handleAuthCode = () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code'); // Odbierz kod
        console.log(code)
        if (code) {
            exchangeCodeForToken(code); // Wymień kod na token
        }
    };
    
    useEffect(() => {
        handleAuthCode();
    }, []);

    return null; // Nie renderuj nic, to tylko logika obsługi logowania
};

export default LoginHandler;