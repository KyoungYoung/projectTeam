const maje = document.querySelector("#me"),
      majc = document.querySelector("#mc"),
      majb = document.querySelector("#mb"),
      ree = document.querySelector("#re"),
      rec = document.querySelector("#rc"),
      calnum = document.querySelector("#calbnt");
calnum.addEventListener("click", caln );
//데이터 베이스 들어오고 계산 가능(예로 ict 19학번)
function caln(){
    
    
    
}
total = maje + majc + majb + ree + rec
if(total >= 130 ){

    document.write("졸업학점 ")


}else{
    document.write("졸업학점을 채우지 못했습니다.")
}