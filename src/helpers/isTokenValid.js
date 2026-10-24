import {jwtDecode} from "jwt-decode";

export function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        const isValid = expirationTime > currentTime;

        console.log('Token geldig:', isValid);

        return isValid;
    } catch (error) {
        console.log('Token geldig: false (ongeldig JWT-formaat)');
        return false;
    }
}