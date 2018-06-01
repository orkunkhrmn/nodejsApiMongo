'user strict'
class GuideInfo {
    constructor(_id, fullname, address, user_id) {
        this._id = _id;
        this.fullname = fullname;
        this.address = address;
        this.user_id = user_id;
    }
    getId() {
        return this._id;
    }

    getFullname() {
        return this.fullname;
    }

    setFullname(fullname) {
        this.fullname = fullname;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    getUserId() {
        return this.user_id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
    }

    setId(_id) {
        this._id = _id;
    }
}

module.exports = GuideInfo;