
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { background-color: #EFEFF4; }\n.",[1],"input-view { font-size: ",[0,28],"; }\n.",[1],"feedback-submit{ background-color:#fd5950; background: -webkit-gradient(linear, left top, right top, from(#ff7575), to(#fd5950)); background: -o-linear-gradient(left, #ff7575, #fd5950); background: linear-gradient(left, #ff7575, #fd5950); }\n.",[1],"close-view{ text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px; }\n",],undefined,{path:"./platforms/app-plus/feedback/feedback.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./platforms/app-plus/feedback/feedback.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      