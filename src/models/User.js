"use strict";

const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }

    login(){
        const client = this.body;
        const {id,passwd} = UserStorage.getUserInfo(client.id);
        // const {id, passwd} = UserStorage.getUsers("id","passwd") ;
        // console.log(id,passwd);
        if(id){
            if( id === client.id && passwd === client.passwd){
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }

    register(){
        const client = this.body;
        UserStorage.save(client);
    }
}

module.exports = User;