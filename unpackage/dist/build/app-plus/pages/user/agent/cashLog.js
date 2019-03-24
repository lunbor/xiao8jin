
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { height: auto; min-height: 100%; background-color: #FFFFFF; }\n.",[1],"list-view { padding:",[0,10]," 0; }\n.",[1],"list-item { margin: ",[0,20]," 0; width: 100%; border-bottom: ",[0,2]," solid #eee; text-align: center; }\n.",[1],"justify{-webkit-box-pack: justify;-webkit-justify-content: space-between;-ms-flex-pack: justify;justify-content: space-between;}\n.",[1],"justify .",[1],"left-text{ text-align: left;}\n.",[1],"justify .",[1],"right-text{ text-align: right;}\n.",[1],"log-title{font-size: ",[0,36],"; color: #333333;}\n.",[1],"log-tail{font-size: ",[0,28],"; color: #888888;}\n.",[1],"log-time{font-size: ",[0,28],"; color: #888888;}\n.",[1],"log-money{font-size: ",[0,32],"; color: #ff3e31;font-weight: 600;}\n.",[1],"log-balance{font-size: ",[0,28],"; color: #666666;}\n.",[1],"log-status{font-size: ",[0,28],"; color: #44c055;}\n.",[1],"log-status .",[1],"log-icon{font-size: ",[0,38],";}\n.",[1],"log-status.",[1],"red{color: #ff3e31;}\n.",[1],"log-status.",[1],"blue{color: rgb(134, 134, 255);}\n.",[1],"no-list{ text-align: center; height: ",[0,260],"; padding-top: 50%;}\n.",[1],"no-list wx-image{width: ",[0,185],"; height: ",[0,60],";}\n",],undefined,{path:"./pages/user/agent/cashLog.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/user/agent/cashLog.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      