'user strict'
class UserInfo {
    constructor(username, fullname, password) {
        this.username = username;
        this.fullname = fullname;
        this.password = password;
    }
    getUsername() {
        return this.username;
    }

    setUsername(username){
        this.username = username;
    }

    getFullname() {
        return this.fullname;
    }

    setFullname(fullname){
        this.fullname = fullname;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password){
        this.password = password;
    }
}

module.exports = UserInfo;