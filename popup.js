/*$(function(){
    $('click').keyup(function(){
        $('#greet').text(Date.now() + ' ' + $('#name').val());
    })
})*/

// function myAlert(){
//     alert('this is a web tracker')
// }
// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('alertButton').addEventListener('click', myAlert);
// })

// chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerHTML);

// //changing button text when clicked
// function change() // no ';' here
// {
//     var elem = document.getElementById("button");
//     if (elem.value == "Off") elem.value = "On";
//     else elem.value = "Off";
// }

// $("#button1").click(function(){
//     var counter = 10;
//     alert('ye');
//     setInterval(function() {
//         counter--;
//         if(counter >= 0){
//             span = document.getElementById("count");
//             span.innerHTMl = counter;
//             alert('ye');
//         }
//         if(counter === 0) {
//             alert('sorry, out of time');
//             clearInterval(counter);
//         }
//     }, 1000);
// });


window.onload=function()
  {
   document.getElementById("button1").onclick=function()
    {
  var websiteVar = document.getElementById('userWebsite').value;
  chrome.runtime.sendMessage({ website: websiteVar, message:"Go_To_Clicked"});
}
  }

