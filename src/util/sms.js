const axios = require('axios');

class SmsProvider {

    senderId = 'Promo';

    makeRouter(message,phoneNumber) {
        return `http://sms.smsnotifygh.com/smsapi?key=${process.env.SMS_KEY}&to=${phoneNumber}&msg=${message}&sender_id=${this.senderId}`;
    }

    async sendOtp(code,phoneNumber) {
        let res = null;
        let msg = '';
        this.message = "Your Quick Account Code is: " + code + ". Don't share it with anyone.";
        const smsResponse = await axios.get(this.makeRouter(this.message,phoneNumber))
        return smsResponse;
    }


    smsStatusResolver(data) {
        let res = null
        let msg  = '';
        switch (data) {
            case 1000:
                res = 200
                msg = "Message sent";
                break;
            case 1002:
                msg = "Message not sent";
                break;
            case 1003:
                msg = "You don't have enough balance";
                break;
            case 1004:
                msg = "Invalid API Key";
                break;
            case 1005:
                msg = "Phone number not valid";
                break;
            case 1006:
                msg = "Invalid Sender ID";
                break;
            case 1008:
                msg = "Empty message";
                break;
        }
        return {code:res,message:msg}
    }

}

module.exports = { SmsProvider }