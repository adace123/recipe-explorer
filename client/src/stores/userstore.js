import {observable, action, computed} from 'mobx';
import axios from 'axios';

const API_URL = "https://recipe-explorer-api.herokuapp.com";
class UserStore {
    @observable currentUser = window.localStorage.getItem("user");
    @observable token = window.localStorage.getItem("token");

    @action
    async authenticateLocal(email, password, username = null) {
        
        if(this.currentUser === null || this.currentUser === undefined) {
            try {
                const { data } = await axios.post(`${API_URL}/auth/${username ? "register" : "login"}`, {email, username, password, token: this.token});
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("user", JSON.stringify(data.user));
                this.currentUser = JSON.stringify(data.user);
                this.token = data.token;
                return `${username ? "Registered" : "Signed in"} successfully!`;
            } catch(e) {
                return "Auth failed";
            }
        }
        
        return "Already logged in";
    }
    
    @action
    async oauth(provider) {
        switch(provider) {
            case "facebook":
                await axios.get(API_URL + "/auth/facebook/callback");
                break;
            case "google":
                await axios.get(API_URL + '/auth/google');
                break;
            default:
                return `${provider} oauth not supported for this application.`;
        }
    }
    
    @action
    async logout() {
        await axios.post(API_URL + '/auth/logout', {token: this.token});
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        this.currentUser = null;
        this.token = null;
    }
    
    @computed get loggedIn() {
        return this.currentUser !== null;
    }
    
    @action
    canEditDelete(userid) {
        return this.isLoggedin() && userid === this.getCurrentUser().userid; 
    }
    
    @action
    getCurrentUser() {
        if(this.currentUser) {
            return JSON.parse(this.currentUser);
        }
    }
}

export default UserStore;