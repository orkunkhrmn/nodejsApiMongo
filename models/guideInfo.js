'user strict'
class GuideInfo {
    constructor(fullname, address, user_id) {
        this.fullname = fullname;
        this.address = address;
        this.user_id = user_id;
    }
    getFullname() {
        return this.fullname;
    }

    setFullname(fullname){
        this.fullname = fullname;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address){
        this.address = address;
    }

    getUserId() {
        return this.user_id;
    }

    setUserId(user_id){
        this.user_id = user_id;
    }
}

module.exports = GuideInfo;