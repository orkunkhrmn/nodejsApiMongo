'user strict'
class ResultInfo {
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
    getSuccess() {
        return this.success;
    }
    getData() {
        return this.data;
    }
    getMessage() {
        return this.message;
    }

    setSuccess(success){
        this.success = success;
    }

    setMessage(message){
        this.message = message;
    }

    setData(data){
        this.data = data;
    }
}

module.exports = ResultInfo;