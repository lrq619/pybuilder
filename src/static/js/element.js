
//global variables
// import 'renderMsgs.js';
var title;//document title
var focus = undefined;
var buffer_focus = undefined;
var buffer_ele_num = 0;

var dragging = false;
var iX, iY;
var eleid = 0;
var buffer_eleid = 0;

var is_arrow = false;
var is_button = false;
var is_entry = false;
var is_label = false;
var is_frame = false;
var is_checkbutton = false;
var is_radiobutton = false;
var is_progressbar = false;
const testMode = false; const vscode = testMode ? {} : acquireVsCodeApi();
var element_id = 0;

var dic = {'0':new Array(0)};

function bindingfun(event,callback)
{
    this.event = event;
    this.callback = callback;
}
//global functions
function delete_px(str){
    return str.substring(0,str.length - 2);
}

function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex.toUpperCase();
}

function hasRepeatName(){
    let elements = $(".element");
    console.log(elements);
    let names = new Array();
    for(let i=0;i<elements.length;i++){
        let name = $(elements[i]).attr("name");
        if($.inArray(name,names)<0){
            names.push(name);
        }else{
            return true;
        }
    }
    return false;
}

function move(e){
    if(!is_arrow){return;}
        if (dragging) {
            var e = e || window.event;
            var oX = e.clientX - iX;
            var oY = e.clientY - iY;
            if($(focus).parent().attr("name") === "window"){
                oX = Math.max(oX,0);
                oY = Math.max(oY,0);
            }
            
            if($(focus).attr("id") !== "window"){
                oX = Math.min(oX,$(".winBody").width() - $(focus).width());
                oY = Math.min(oY,$(".winBody").height() - $(focus).height());
            }
            
            $(focus).css({
                "left": oX + "px",
                "top": oY + "px"
            });
            renderAttrBoard(focus);
            return false;
        }
};

function interval(){
    if(eleid > buffer_eleid){
        let newelement = $(".element[eleid='"+eleid+"']");
        elementBdfun(newelement);
        buffer_eleid = eleid;
    }
    if(focus === buffer_focus){
        
    }else{
        if(buffer_focus === undefined){
            renderAttrBoard(focus);
            //focus从无到有
        }else{
            if(focus == undefined){
                $(".board").hide();//focus从有到无
            }else{
                renderAttrBoard(focus);
            }
        }
        buffer_focus = focus;
    }
}

function elementBdfun(element){
    $(element).click(function(e){
        if(!is_arrow){return;}
        e.stopPropagation();
        if(focus === this||focus === undefined){
            if($(this).children(".frame").is(":visible")){
                
            }else{
                $(this).children(".frame").show();
                focus = this;
            }
        }else if(focus !== this){
            $(focus).children(".frame").hide();
            $(this).children(".frame").show();
            focus = this;
        }
    
    });
    $(element).mousedown(function(e){

        if(!is_arrow||focus!==this){return;}
        dragging = true;
        iX = e.clientX - this.offsetLeft;
        iY = e.clientY - this.offsetTop;
        return false;
    });
    $(element).children().children(".leftHandler").mousedown (function (e){
        if(!is_arrow){return;}
        e.stopPropagation();
        var deltaX = e.clientX - (parseFloat($(this).css("left")));
        $(document).mousemove(function(e){
            var lt = e.clientX - deltaX;
            lt = lt < 0 ? 0 : lt;
            $(focus).width(lt);
            renderAttrBoard(focus);
        });
        $(document).mouseup(function(){
            if(!is_arrow){return;}
            $(document).unbind("mousemove");
            $(document).mousemove(move);
        });
        $(document)[0].ondragstart
                = $(document)[0].onselectstart
                = function ()
            {
                return false;
            };
    });
    $(element).children().children(".downHandler").mousedown (function (e){
        if(!is_arrow){return;}
        e.stopPropagation();
        var deltaY   = e.clientY - (parseFloat($(this).css("top")));
        $(document).mousemove(function(e){
            var lt = e.clientY - deltaY;
            lt = lt < 0 ? 0 : lt;
            $(focus).height(lt);
            renderAttrBoard(focus);
        });
        $(document).mouseup(function(){
            $(document).unbind("mousemove");
            $(document).mousemove(move);
        });
        $(document)[0].ondragstart
                = $(document)[0].onselectstart
                = function ()
            {
                return false;
            };
    });
    $(element).children().children(".allHandler").mousedown (function (e){
        if(!is_arrow){return;}
        e.stopPropagation();
        var deltaX = e.clientX - (parseFloat($(this).css("left")));
        var deltaY   = e.clientY - (parseFloat($(this).css("top")));
        $(document).mousemove(function(e){
            var lt = e.clientX - deltaX;
            lt = lt < 0 ? 0 : lt;
            var tp = e.clientY - deltaY;
            tp = tp < 0 ? 0 : tp;
            $(focus).width(lt);
            $(focus).height(tp);
            renderAttrBoard(focus);
        });
        $(document).mouseup(function(){
            $(document).unbind("mousemove");
            $(document).mousemove(move);
        });
        $(document)[0].ondragstart
                = $(document)[0].onselectstart
                = function ()
            {
                return false;
            };
    });
}

function renderBindingFun(bdfunid,eval,cval){
    bdfun_html = '<div class="bdfun" id="'+bdfunid+'"style="width: 275px; height: 60px; position: relative; left: 10px; top: 10px; border: 1px solid rgb(0, 0, 0);"><div><select class="SelInput_Sel" id="'+bdfunid+'-e-'+'sel" style="width: 108.333px; height: 16px; position: absolute; left: 10px; top: 10px;"><option></option><option>Button-1</option><option>ButtonRelease</option><option>Configure</option><option>Deactivate</option><option>Enter</option><option>Expose</option><option>FocusIn</option><option>FocusOut</option><option>KeyPress-A</option><option>KeyRelease</option><option>Leave</option><option>Map</option><option>Motion</option><option>MouseWheel</option><option>Unmap</option><option>Visibility</option></select><input class="SelInput_Input" id="'+bdfunid+'-e-'+'" style="width: 83.3333px; height: 10px; position: absolute; left: 10px; top: 10px;"><div style="width: 0px; height: 10px; position: absolute; left: 10px; top: 10px; text-align: center;"></div></div><div><select class="SelInput_Sel" id="'+bdfunid+'-c-'+'sel" style="width: 108.333px; height: 16px; position: absolute; left: 143.333px; top: 10px;"><option></option></select><input class="SelInput_Input" id="'+bdfunid+'-c-'+'" style="width: 83.3333px; height: 10px; position: absolute; left: 143.333px; top: 10px;"><div style="width: 0px; height: 10px; position: absolute; left: 143.333px; top: 10px; text-align: center;"></div></div><div class="delbdfun" id="'+bdfunid+'del" style="width: 25px; height: 25px; left: calc(100% - 30px); top: calc(100% - 30px); position: relative;"><button style="width: 100%; height: 100%; left: 0px; top: 0px; position: relative; text-align: center; color: #cccccc; background: #0e70c0">x</button></div></div></div>';
    $("#addbdfun").before(bdfun_html);
    let selfun = function(e){
        let eleid = $(focus).attr("eleid");
        let thisid = $(this).attr("id");
        let bdfunid = thisid.split("-")[0];
        let eorc = thisid.split("-")[1];
        console.log("eleid: "+eleid+" bdfunid: "+bdfunid+" eorc: "+eorc);
        if(eorc === 'e'){
            dic[eleid][bdfunid].event = $(this).val();
        }else if(eorc === 'c'){
            dic[eleid][bdfunid].callback = $(this).val();
        }else{
            
        }
        let sel_id = $(this).attr("id");
        let input_id = sel_id.substring(0,sel_id.length - 3);
        document.getElementById(input_id).value = $(this).val();
    };
    let inputfun = function(e){
        let eleid = $(focus).attr("eleid");
            let thisid = $(this).attr("id");
            let bdfunid = thisid.split("-")[0];
            let eorc = thisid.split("-")[1];
            console.log("eleid: "+eleid+" bdfunid: "+bdfunid+" eorc: "+eorc);
            if(eorc === 'e'){
                dic[eleid][bdfunid].event = $(this).val();
            }else if(eorc === 'c'){
                dic[eleid][bdfunid].callback = $(this).val();
            }else{
                
            }
            let input_id = $(this).attr("id");
            let sel_id = input_id + "sel";
            document.getElementById(sel_id).value = $(this).val();
    };
    $("#"+bdfunid+"-e-sel").change(selfun);
    $("#"+bdfunid+"-c-sel").change(selfun);
    $("#"+bdfunid+"-e-").change(inputfun);
    $("#"+bdfunid+"-c-").change(inputfun);
    
    document.getElementById(bdfunid+"-e-").value = eval;
    document.getElementById(bdfunid+"-c-").value = cval; 
    console.log(dic);
    $("#"+bdfunid+"del").click(function(e){
        let bdfunid = $(this).parent().attr("id");
        let eleid = $(focus).attr("eleid");
        $(this).parent().remove();
        delete dic[eleid][bdfunid];
    });
}

function renderAttrBoard(focus){
    $(".board").show();
    $(".other-div").hide();
    $(".AttrInput").attr("disabled",false);
    let eleid = $(focus).attr("eleid");
    let subclass = $(focus).attr("subclass");
    switch (subclass){
        case "window":
            $("#name").val("window");
            $("#name").attr("disabled","disabled");
            $("#board-title").html("Window");
            $("#other-div-win").show();
            $("#text").val($(focus).children().children(".window").text());
            $("#background-color").val(colorRGB2Hex($(focus).children(".winBody").css("background-color")));
            $("#foreground-color").val("#F0F0F0");
            $("#foreground-color").attr("disabled","disabled");
            break;
        case "button":
            $("#board-title").html("Button");
            $("#other-div-btn").show();
            $("#command").val($(focus).attr("command"));
            $("#text").val($(focus).children(".button").text());
            $("#foreground-color").val(colorRGB2Hex($(focus).children(".button").css("color")));
            $("#background-color").val(colorRGB2Hex($(focus).children(".button").css("background-color")));
            
            break;
        
        case "entry":
            $("#board-title").html("Entry");
            $("#text").val("");
            $("#text").attr("disabled","disabled");
            $("#foreground-color").val(colorRGB2Hex($(focus).children(".entry").css("color")));
            $("#background-color").val("#F0F0F0");
            $("#background-color").attr("disabled","disabled");
            break;
        case "label":
            $("#board-title").html("Label");
            $("#text").val($(focus).children(".label").text());
            $("#foreground-color").val(colorRGB2Hex($(focus).children(".label").css("color")));
            $("#background-color").val(colorRGB2Hex($(focus).children(".label").css("background-color")));  
            break;
        case "frame":
            $("#board-title").html("Frame");
            $("#text").val("");
            $("#text").attr("disabled","disabled");
            $("#foreground-color").val("#F0F0F0");
            $("#foreground-color").attr("disabled","disabled");
            $("#background-color").val(colorRGB2Hex($(focus).css("background-color")));
            break;
        case "checkbutton":
            $("#board-title").html("CheckButton");
            $("#text").val($(focus).children(".checkbutton").text());
            $("#foreground-color").val(colorRGB2Hex($(focus).css("color")));
            $("#background-color").val(colorRGB2Hex($(focus).css("background-color")));
            break;
        case "radiobutton":
            $("#board-title").html("RadioButton");
            $("#text").val($(focus).children(".radiobutton").text());
            $("#foreground-color").val(colorRGB2Hex($(focus).css("color")));
            $("#background-color").val(colorRGB2Hex($(focus).css("background-color")));
            break;
        case "progressbar":
            $("#board-title").html("ProgressBar");
            $("#text").val("");
            $("#text").attr("disabled","disabled");
            $("#foreground-color").val("#F0F0F0");
            $("#foreground-color").attr("disabled","disabled");
            $("#background-color").val("#F0F0F0");
            $("#background-color").attr("disabled","disabled");
            break;

    }
    let fgcolor = 'linear-gradient(to right, '+$("#foreground-color").val()+' 0%, '+$("#foreground-color").val()+' 30px, rgba(0, 0, 0, 0) 31px, rgba(0, 0, 0, 0) 100%), url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAU0lEQVRIS2OcOXPmfwY84OzZs/ikGYyNjfHK49KfkpLCsG3btuWMow4YDYHREBjwEEhLS8NbDpCbz2GFAy79Tk5ODEuXLl3OOOqA0RAYDYGBDgEA8m6qcb3sNVEAAAAASUVORK5CYII=")';
    let bgcolor = 'linear-gradient(to right, '+$("#background-color").val()+' 0%, '+$("#background-color").val()+' 30px, rgba(0, 0, 0, 0) 31px, rgba(0, 0, 0, 0) 100%), url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAU0lEQVRIS2OcOXPmfwY84OzZs/ikGYyNjfHK49KfkpLCsG3btuWMow4YDYHREBjwEEhLS8NbDpCbz2GFAy79Tk5ODEuXLl3OOOqA0RAYDYGBDgEA8m6qcb3sNVEAAAAASUVORK5CYII=")';
    $("#foreground-color").css("background-image",fgcolor);
    $("#background-color").css("background-image",bgcolor);
    $("#name").val($(focus).attr("name"));
    $("#width").val(delete_px($(focus).css("width")));
    $("#height").val(delete_px($(focus).css("height")));
    $("#top").val(delete_px($(focus).css("top")));
    $("#left").val(delete_px($(focus).css("left")));
    let bdfuns = dic[eleid];
    
    $("#bind-board").children(".bdfun").remove();
    for(var key in bdfuns){
        renderBindingFun(key,bdfuns[key].event,bdfuns[key].callback);
    }
    
}//显示focus的属性面板

//Main part of this program
$(document).ready(function(){
    
    $(document).click(function(){
        if(focus !== undefined && $(focus).children(".frame").is(":visible")){
            $(focus).children(".frame").hide();
            focus = undefined;
        }
    });
    
    $(document).mousemove(move);
    $(document).mouseup(function(e) {
        if(!is_arrow){return;}
        dragging = false;
        // focus.releaseCapture && focus.releaseCapture();
        // e.cancelBubble = true;
    });
    let newelement = $(".element[eleid='"+eleid+"']");
    elementBdfun(newelement);
    $("body").css("overflow","hidden");

    window.addEventListener('message', event => {
        const message = event.data['txt'];
        console.log(message);
        if(message.substring(0,4) === "Form"){
            document.title = message;
        }
        if(message === "submit"){
            if(hasRepeatName()){
                console.log("repeat!");
                vscode.postMessage("RepName");
                return;
            }
            let out_msg = {
                window: renderWinMsg(),
                button: renderBtnMsgs(),
                entry: renderEtrMsgs(),
                label: renderLabMsgs(),
                frame: renderFrmMsgs(),
                checkbutton: renderCkbMsgs(),
                radiobutton: renderRdbMsgs(),
                progressbar: renderPgbMsgs(),
                dic: dic,
                title: document.title
            };
            vscode.postMessage(out_msg);
            return;
        }
        if(message === "arrow"){
            is_arrow = true;
        }else{
            is_arrow = false;
            $(focus).children(".frame").hide();
            focus = undefined;
        }
        
        if(message === "button"){
            is_button = true;
        }else{
            is_button = false;
        }
        
        if(message === "entry"){
            is_entry = true;
        }else{
            is_entry = false;
        }

        if(message === "label"){
            is_label = true;
        }else{
            is_label = false;
        }

        if(message === "frame"){
            is_frame = true;
        }else{
            is_frame = false;
        }

        if(message === "checkbutton"){
            is_checkbutton = true;
        }else{
            is_checkbutton = false;
        }

        if(message === "radiobutton"){
            is_radiobutton = true;
        }else{
            is_radiobutton = false;
        }

        if(message === "progressbar"){
            is_progressbar = true;
        }else{
            is_progressbar = false;
        }
    });
    
    
    $(".board").click(function(e){
        e.stopPropagation();
    });
    $(".board-sel").click(function(e){
        $(this).css("border-top","1px solid #cccccc");
        $(this).css("border-bottom","0px");
        let id = $(this).attr("id");
        let board_id = id + "-board";
        let board = document.getElementById(board_id);
        $(board).css("display","block")
        for(i=0;i < $(".board-sel").length;i++){
            var sel = $(".board-sel")[i];
            if(sel != this){
                $(sel).css("border-bottom","1px solid #cccccc");
                $(sel).css("border-top","0px");
                let id = $(sel).attr("id");
                let board_id = id + "-board";
                let board = document.getElementById(board_id);
                $(board).css("display","none");
            }
        }
    });
    $(".AttrInput").change(function(e){
        var id = $(this).attr("id");
        var subclass = $(focus).attr("subclass");
        if($.inArray(id,style_attrs)>=0){
            $(focus).css(id,$(this).val()+"px");
        }else{
            switch(id){
                case("name"):
                    $(focus).attr("name",$(this).val());
                    break;
                case("text"):
                    if(subclass === "button" || subclass === "label" || subclass === "checkbutton" || subclass === "radiobutton"){
                        $(focus).children("."+subclass).text($(this).val());
                    }else if(subclass === "window"){
                        $(focus).children().children(".window").text($(this).val());
                    }else{
                        $(focus).attr("text",$(this).val());
                    }
                    break;
                case("foreground-color"):
                    if(subclass === "button" || subclass === "entry" || subclass === "label"){
                        $(focus).children("."+subclass).css("color",$(this).val());
                    }else if(subclass === "checkbutton" || subclass === "radiobutton"){
                        $(focus).css("color",$(this).val());
                    }
                    break;
                case("background-color"):
                    if(subclass === "button" || subclass === "label"){
                        $(focus).children("."+subclass).css("background-color",$(this).val());
                    }else if(subclass === "window"){
                        $(focus).children(".winBody").css("background-color",$(this).val());
                    }else if(subclass === "frame" || subclass === "checkbutton" || subclass === "radiobutton"){
                        $(focus).css("background-color",$(this).val());
                    }

                    break;
            }
        }
    });
    
    $("#command").change(function(e){
        $(focus).attr("command",$(this).val());
    });
    
    
    $(".jscolor-picker").click(function(e){
        e.stopPropagation();
        console.log("click color");
    });
    $("#addbdfun").click(function(e){
        console.log(dic);
        let eleid = $(focus).attr("eleid");
        let currentbdfunid;
        currentbdfunid = dic[eleid].length;
        dic[eleid][currentbdfunid.toString()] = new bindingfun("","");
        renderBindingFun(currentbdfunid,"","");
    });
    $("#delelt").click(function(e){
        let eleid = $(focus).attr("eleid");
        if(eleid === "0"){
            vscode.postMessage("DelMainWin");
            return;
        }
        let children = $(focus).children(".element");
        console.log(children);
        for(let i=0;i<children.length;i++){
            let child_eleid = $(children[i]).attr("eleid");
            delete dic[child_eleid];
        }
        $(focus).remove();
        focus = undefined;
        delete dic[eleid];
    });
    $(".winBody").click(function(e){
        if (is_arrow){
            console.log("is_arrow");
            return;
        }
        if (is_button){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 55;
            renderButton($(".winBody"),x,y);
            return;
        }
        if(is_entry){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 45;
            renderEntry($(".winBody"),x,y);
            return;
        }
        if(is_label){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 45;
            renderLabel($(".winBody"),x,y);
            return;
        }

        if(is_frame){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 100;
            y = e.clientY - parseFloat($("#window").css("top")) - 130;
            renderFrame($(".winBody"),x,y);
            return;
        }

        if(is_checkbutton){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 45;
            renderCheckbutton($(".winBody"),x,y);
            return;
        }

        if(is_radiobutton){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 45;
            renderRadiobutton($(".winBody"),x,y);
            return;
        }

        if(is_progressbar){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- 50;
            y = e.clientY - parseFloat($("#window").css("top")) - 45;
            renderProgressbar($(".winBody"),x,y);
            return;
        }

    });
    $(".SelInput_Sel").change(function(e){
        let sel_id = $(this).attr("id");
        let input_id = sel_id.substring(0,sel_id.length - 3);
        document.getElementById(input_id).value = $(this).val();

    });
    $(".SelInput_Input").change(function(e){
        let input_id = $(this).attr("id");
        let sel_id = input_id + "sel";
        document.getElementById(sel_id).value = $(this).val();
    });
    setInterval("interval()",100);//This function will be excuted in loop
});


    