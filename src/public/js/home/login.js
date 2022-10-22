"use strict";

// html(login.ejs)와 연결되어있는 파일
const id = document.querySelector("#id"),
    passwd = document.querySelector("#password"),
    loginbnt = document.querySelector("#button");

loginbnt.addEventListener("click", bnt);

    
    
function bnt(){
    const req = {
        id: id.value,
        passwd: passwd.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인 중 에러 발생");
    });
};
    