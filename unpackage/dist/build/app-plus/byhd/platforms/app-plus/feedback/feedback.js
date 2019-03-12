
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([[2,1],"body{background-color:#efeff4}\n.",[1],"input-view{font-size:",[0,28],"}\n.",[1],"feedback-submit{background-color:#fd5950;background:-webkit-linear-gradient(left,#ff7575,#fd5950);background:linear-gradient(left,#ff7575,#fd5950)}\n.",[1],"close-view{text-align:center;line-height:14px;height:16px;width:16px;border-radius:50%;background:#ff5053;color:#fff;position:absolute;top:-6px;right:-4px;font-size:12px}\n",],undefined,{path:"./platforms/app-plus/feedback/feedback.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./platforms/app-plus/feedback/feedback.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      