"use strict";

// html(register.ejs)와 연결되어있는 파일
const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    passwd = document.querySelector("#password"),
    confirmPasswd = document.querySelector("#confirm-passwd"),
    registerBnt = document.querySelector("#button");
console.log("hello");
registerBnt.addEventListener("click", register);

    
    
function register(){
    const req = {
        id: id.value,
        name: name.value,
        passwd: passwd.value,
        confirmPasswd: confirmPasswd.value,
    };
console.log(req);

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/login";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("회원가입 중 에러 발생");
    });
};
    