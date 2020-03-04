
$(function(){
    console.error("页面被刷新，请检查代码（如果是浏览器刷新动作请忽略该信息）")
    // pjax 绑定菜单点击事件
    // $(".layui-side-scroll ul li a").bind("click", clickMenu);
    // $("#menu").on("click","li a",function(event){
    //     // debugger;
    //     var that= $(this);
    //     clickMenu(event,$(that));
    // })
    // $("#pjax-container").on("click",".subMenu li div",function(event){
    //     // debugger;
    //     var that= $(this);
    //     clickMenu(event,$(that));
    // })
    $("#menu").on("click","li a",function(event){
        // debugger;
        var that= $(this);
        clickMenu(event,$(that));
    })
    $("#pjax-container").on("click",".subMenu li div",function(event){
        // debugger;
        var that= $(this);
        clickMenu(event,$(that));
    })
});

/**
 * 点击菜单
 */
function clickMenu(event,that) {
    event.preventDefault();	// 取代 return false 防止页面跳转
    var $this = $(that);
    var url = $this.attr("href");
    if(Utils.isBlank(url)){
        url = $this.attr("href")
    }
    // debugger
    if(!Utils.isBlank(url)){
        if(url.indexOf("http")==-1){
            url="http://"+window.location.hostname+":"+window.location.port+url;
        }
    }

    var isFilterMenu=false;

    if(url.indexOf("/trace")!=-1){
        var filterList=["car","road","store","carManage","waterlogging"];//过滤正在开发中的路由菜单
        for(var i in filterList){
            if(url.indexOf(filterList[i])!=-1){
                isFilterMenu=true;
                break;
            }
        }

    }
    //显示正在开发中的操作
    if(isFilterMenu){
        alert("功能正在开发中");
        event.preventDefault();//阻止a标签的默认事件

        return false;
    }


    /***hasSubMenu代表是否有子菜单，Junior修改了pjax源码，会发送一个请求头XHR.request请求头到服务器**/
    var hasSubMenu=$this.parents("li").attr("hasSubMenu");
    // alert('hasSubMenu=='+hasSubMenu);
    // debugger
    if(hasSubMenu=='false'){//没有子菜单走这个
        // alert('没有二级菜单')
        sendPjax(url, "#pjax-container");
    }else{//有子菜单则会发一个XHR请求头hasSubMenu到服务器
        // alert('有二级菜单')
        sendPjax(url, "#pjax-container",xhrRequestHead="hasSubMenu");
    }

}

/**
 * 发送 pjax
 * url：后台 action
 * container：承载响应内容的容器
 * extData：扩展数据，可以在 pajx 事件回调方法中通过 options.extData 获取
 * 			例如：$(document).on('pjax:success', function(event, data, status, xhr, options)
 */
function sendPjax(url, container, xhrRequestHead) {

    // Disable pushState behavior.
    // This is the case when a browser doesn't support pushState. It is
    // sometimes useful to disable pushState for debugging on a modern
    // browser.
    // $.pjax.disable();//禁用前进后退记录
    /***
     * @author JuniorRay
     * @date 2020年2月19日
     * @description 修改pjax源码添加xhr请求头配置便于个性化操作xhrRequestHead="hasSubMenu"
     * **/
    $.pjax({
        url: url
        , container: container
        ,xhrRequestHead : xhrRequestHead
    });
}