import axios from 'axios';
import { environment } from '../../environment';
const apiUrl= environment.apiUrl 

export default class AuthServicies{
    setUserLogged(user: any){
        window.localStorage.setItem('user', JSON.stringify(user))
    }
    getUserLogged(){
        return window.localStorage.getItem('user')
    }

    register(user:any){
    
        return axios.post(apiUrl + "",user)
    }

    login(credenciales:any){

        return axios.post(apiUrl+"login",credenciales)
    }

 }