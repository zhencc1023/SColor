$(document).ready(function () {
    // chrome.extension.sendMessage({cmd: "fromcontentscript"}, function (response) {
    //     if (response.frompopup) {
    //        alert(response.frompopup);
    //     }
    //  });content_script 向popop发送信息
  
    //content_script监听popop信息
    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
            if (request.greeting&&request.greeting!=undefined) {
                sendResponse({farewell:"success!"});
                change(request.greeting);
            }
        });

        function change(rgb) {
            var divArray = document.getElementsByTagName("div");
            for(var i=0;i<divArray.length;i++){
                divArray[i].style.backgroundColor = rgb;
            }
        }
        //防止延时加载
        setTimeout(() => {
            clear.init();
        }, 1000);
})

var  clear={
    init:function(){
        var refer=document.location.origin;
        this.sw(refer);
    },
    sw:function(localStr){
        var self=this;
        switch (localStr) {
            case "https://blog.csdn.net":
                var classArr=['aside iframe','main iframe','main newsfeed']
                self.remove(classArr,'Tag');
                break;
        
            default:
                break;
        }
    },
    remove:function(arr,type){
        if(type=='Id'){
            for (let index = 0; index < arr.length; index++) {
                 $('#'+arr[index]).remove();
            }
        }
        if(type=='Class'){
            for (let index = 0; index < arr.length; index++) {
                $('.'+arr[index]).remove();
            }
        }
        if(type=='Tag'){
            for (let index = 0; index < arr.length; index++) {
                $(arr[index]).remove();
            }
        }
    }
}