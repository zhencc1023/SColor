// var  utils={
//     change:function() {

//         chrome.tabs.query(query, function (tabs) {
//             chrome.tabs.executeScript(tabs[0].id, {
//                 file: 'js/init.js'
//             });
//         });
//     }
// }


$(document).ready(function () {
    var query = {
        active: true,
        currentWindow: true
    };
    $("#green").click(function () {
        send('rgb(195, 239, 215)');
    });
    $("#yellow").click(function(){
        send('#e8de64');
    });
    $('#openColor').colpick({
        flag:false,
        layout:'hex',
        onSubmit:function(hex,color,rgb,obj){
            $('#showRgb').val('#'+color);
        }
    });
   $('#goToAc').click(function(){
       var rgb=$('#showRgb').val();
       send(rgb);
   }) 
    chrome.extension.onMessage.addListener( //直接接受popup发来的消息
        function (request, sender, sendResponse) {
            if (request.cmd == "fromcontentscript"){
                sendResponse({
                    frompopup: "popup 接受到了来自contetn script的消息"
                });
            }
            else{
                sendResponse({
                    frompopup: "不告诉你"
                })
            }
        });
        //popup向content通信
        function send(msg){
            chrome.tabs.query(query, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    greeting: msg
                }, function (response) {
                    if(!response){
                        show('当前页面需要重新刷新')
                    }
                    show(response.farewell);
                });
            });
        }
        function show(msg){
            $('.showText').show();
            $('.showText span').html(msg);
        }
        function  modfiycolpick(){
            $('.colpick').addClass('colspick')
            $('.context')[0].style.height=400;
        }
})

