const userIdInput = document.querySelector('.login_box li input[type=text]');
const userPwInput = document.querySelector('.login_box li input[type=password]' )
const userLoginBtn = document.querySelector('.login_box li button.btn_join');


userIdInput.addEventListener('click',()=>{
    let name = userIdInput.value;
    console.log(name);
})
userPwInput.addEventListener('click',()=>{
    alert('nice')
})

userLoginBtn.addEventListener('click',()=>{
    location.href = '/join';
})