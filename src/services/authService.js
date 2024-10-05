import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'

/*
public class LoginRequestDTO {
    private String username;
    private String password;
}
*/
export const login = async (data) => {
    const endpoint = 'http://localhost:8080/auth/login';
    return await executeFetch(endpoint, data, HttpMethods.POST, null, 200);
};

/*
public class RegisterRequestDTO {
    private String username;
    private String password;
    private String role;
}
*/ 
export const register = async (data, token) => {
    const endpoint = 'localhost:8080/auth/register';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};