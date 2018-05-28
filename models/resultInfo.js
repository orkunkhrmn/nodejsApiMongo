'user strict'
class ResultInfo {
    constructor(success, data, message, total_record) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.total_record = total_record;
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
    
    getTotalRecord(){
        return this.total_record;
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

    setTotalRecord(total_record){
        this.total_record = total_record;
    }
}

module.exports = ResultInfo;