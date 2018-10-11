var reg=document.getElementById("reg");
var log=document.getElementById("log");
var regbox=document.getElementById("regbox");
var logbox=document.getElementById('logbox');
reg.addEventListener('click',function(){
    regbox.style.display="block";
    reg.style.display="none";
    log.style.display="none";
});
log.addEventListener('click',function(){
    logbox.style.display="block";
    reg.style.display="none";
    log.style.display="none";
});