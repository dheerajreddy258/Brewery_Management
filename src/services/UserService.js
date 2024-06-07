import axios from 'axios';

const serverUrl =  'https://brewery-management.onrender.com';
// const serverUrl = 'http://localhost:8080';

class UserService{
    login(user){
        return axios.post(serverUrl + '/api/auth/login', user);
    }
    register(userName,userEmail,password){
        return axios.post(serverUrl + '/api/auth/register', {userName,userEmail,password});
    }
}

const newUserService = new UserService();
export default newUserService;