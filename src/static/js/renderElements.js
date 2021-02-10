function renderButton(parent,x,y){
    eleid++;
    button_html = '<div class="element" subclass="button" \
    eleid='+eleid+
    ' name=btn_'+eleid+ 
    '  style="width: 100px; height: 50px; position: absolute; left: '+x+'px; top: '+y+'px;">\
    <button class="button" style="width: 100%; height: 100%; left: 0px; top: 0px; position: relative; background: #F0F0F0;color: #000000">button</button>\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: calc(-100% - 5px); position: relative; border: 1px solid rgb(0, 0, 0); cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div><div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;">\
    </div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(button_html);
    }else{
        parent.append(button_html);
    }
    dic[eleid.toString()] = new Array();
    
};//renderButton
function renderEntry(parent,x,y){
    eleid++;
    entry_html = '<div class="element" subclass="entry" \
    eleid='+eleid+
    ' name=etr_'+eleid+
    ' style="width: 100px; height: 25px; left: '+x+'px; top: '+y+'px; position: absolute;">\
    <input class="entry" style="width: calc(100% - 8px); height: calc(100% - 6px); left: 0px; top: 0px; position: relative;color:#000000;">\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: calc(-100% - 5px); position: relative; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(entry_html);
    }else{
        parent.append(entry_html);
    }
    dic[eleid.toString()] = new Array();
}

function renderLabel(parent,x,y){
    eleid++;
    label_html = '<div class="element" subclass="label" \
    eleid='+eleid+
    ' name=lab_'+eleid+
    ' style="width: 100px; height: 25px; left: '+x+'px; top: '+y+'px; position: absolute;">\
    <div class="label" style="width:100%; height:100%; color:#000000;background:#F0F0F0;">Label</div>\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: -5px; position: absolute; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(label_html);
    }else{
        parent.append(label_html);
    }
    dic[eleid.toString()] = new Array();
}
function isInFrame(focus,frame){
    let fl = focus.offsetLeft;
    let ft = focus.offsetTop;
    let fw = parseFloat(delete_px($(focus).css("width")));
    let fh = parseFloat(delete_px($(focus).css("height")));
    let rl = frame.offsetLeft;
    let rt = frame.offsetTop;
    let rw = parseFloat(delete_px($(frame).css("width")));
    let rh = parseFloat(delete_px($(frame).css("height")));
    console.log(fl+fh);
    if((fl+fw > rw)||(ft+fh > rh)||(fl<0)||(ft<0)){
        return false;
    }else{
        return true;
    }
}
function renderFrame(parent,x,y){
    eleid++;
    frame_html = '<div class="element" subclass="frame" \
    eleid='+eleid+
    ' name=frm_'+eleid+
    ' style="width: 200px; height: 200px; left: '+x+'px; top: '+y+'px; position: absolute; background:#F0F0F0; border:1px solid #000000;">\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: -5px; position: absolute; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    $("#frameseparate").after(frame_html);
    $(".element[eleid='"+eleid+"']").mouseenter(function(e) {
        if(!dragging||$(focus).parent()[0] === this||focus === this||$(focus).attr("subclass") === "window"||$(focus).attr("subclass") === "frame"){
            return;
        }
        $(this).css("opacity","0.4");
    });
    $(".element[eleid='"+eleid+"']").mouseleave(function(e){
        if(!dragging||focus === this||$(focus).attr("subclass") === "window"||$(focus).attr("subclass") === "frame"){
            return;
        }else{
            $(this).css("opacity","1");
        }
        
    });
    $(".element[eleid='"+eleid+"']").mousemove(function(e){
        if(!dragging||$(focus).parent()[0] !== this||focus === this||$(focus).attr("subclass") === "window"||$(focus).attr("subclass") === "frame"){
            return;
        }
        if(dragging&&!isInFrame(focus,this)){
            $(focus).css("opacity","0.4");
        }else if(dragging&&isInFrame(focus,this)){
            $(focus).css("opacity","1");
        }
    });
    $(".element[eleid='"+eleid+"']").mouseup(function(e){
        if(!dragging||($(focus).parent()[0] === this&&isInFrame(focus,this))||focus === this||$(focus).attr("subclass") === "window"||$(focus).attr("subclass") === "frame"){
            return;
        }else if(dragging&&$(focus).parent()[0] === this&&!isInFrame(focus,this)){
            $(focus).css("opacity","1");
            let newele = $(focus).clone(true);
            newele.css("left",focus.offsetLeft + this.offsetLeft);
            newele.css("top",focus.offsetTop + this.offsetTop);
            $(focus).remove();
            $("#frameseparate").before(newele);
            focus = newele[0];
        }else{
            dragging = false;
            $(this).css("opacity","1");
            let newele = $(focus).clone(true);
            newele.css("left",focus.offsetLeft - this.offsetLeft);
            newele.css("top",focus.offsetTop - this.offsetTop);
            $(focus).remove();
            $(this).append(newele);
            focus = newele[0];
        }
        
        
    });
    $(".element[eleid='"+eleid+"']").click(function(e){
        e.stopPropagation();
        if (is_arrow){
            console.log("is_arrow");
            return;
        }
        if (is_button){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderButton($(this),x,y);
            return;
        }
        if(is_entry){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderEntry($(this),x,y);
            return;
        }
        if(is_label){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderLabel($(this),x,y);
            return;
        }

        if(is_frame){
            e.stopPropagation();
            vscode.postMessage("FrmInFrm");
            return;
        }

        if(is_checkbutton){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderCheckbutton($(this),x,y);
            return;
        }

        if(is_radiobutton){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderRadiobutton($(this),x,y);
            return;
        }

        if(is_progressbar){
            e.stopPropagation();
            x = e.clientX - parseFloat($("#window").css("left"))- parseFloat($(this).css("left")) - 50;
            y = e.clientY - parseFloat($("#window").css("top")) - parseFloat($(this).css("top")) - 55;
            renderProgressbar($(this),x,y);
            return;
        }
    });
    dic[eleid.toString()] = new Array();
}

function renderCheckbutton(parent,x,y){
    eleid++;
    check_html = '<div class="element" subclass="checkbutton" \
    eleid='+eleid+
    ' name=ckb_'+eleid+
    ' style="width: 125px; height: 25px; left: '+x+'px; top: '+y+'px; position: absolute; color:#000000; background:#F0F0F0;">\
    <input type="checkbox" style="position:absolute; top:calc(50% - 6.5px);"></input>\
    <div class="checkbutton" style="width: calc(100% - 20px); height:100%; position:absolute; left: 20px;top:calc(50% - 6.5px);overflow:hidden;">CheckButton</div>\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: -5px; position: absolute; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(check_html);
    }else{
        parent.append(check_html);
    }
    dic[eleid.toString()] = new Array();
}

function renderRadiobutton(parent,x,y){
    eleid++;
    radio_html = '<div class="element" subclass="radiobutton" \
    eleid='+eleid+
    ' name=rdb_'+eleid+
    ' style="width: 125px; height: 25px; left: '+x+'px; top: '+y+'px; position: absolute; color:#000000; background:#F0F0F0;">\
    <input type="radio" style="position:absolute; top:calc(50% - 6.5px);"></input>\
    <div class="radiobutton" style="width: calc(100% - 20px); height:100%; position:absolute; left: 20px;top:calc(50% - 6.5px);overflow:hidden;">RadioButton</div>\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: -5px; position: absolute; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(radio_html);
    }else{
        parent.append(radio_html);
    }
    dic[eleid.toString()] = new Array();
}

function renderProgressbar(parent,x,y){
    eleid++;
    progress_html = '<div class="element" subclass="progressbar" \
    eleid='+eleid+
    ' name=pgb_'+eleid+
    ' style="width: 125px; height: 25px; left: '+x+'px; top: '+y+'px; position: absolute; color:#000000; background:#F0F0F0;border: 1px solid #c9c9c9">\
    <div class="progressbar" style="height: 95%; width:50%; position:absolute;left:1%;top:2.5%;background:#06b025"></div>\
    <div class="frame" style="width: calc(100% + 10px); height: calc(100% + 10px); left: -5px; top: -5px; position: absolute; border: 1px solid black; cursor: move; display: none;">\
    <div class="leftHandler" style="width: 5px; height: 95%; position: absolute; left: calc(100% - 5px); top: 0px; cursor: e-resize;"></div>\
    <div class="downHandler" style="width: 95%; height: 5px; position: absolute; left: 0px; top: calc(100% - 5px); cursor: n-resize;"></div><div class="allHandler" style="width: 5px; height: 5px; position: absolute; left: calc(100% - 5px); top: calc(100% - 5px); cursor: nw-resize;"></div></div></div>';
    if(parent.attr("class") === "winBody"){
        $("#frameseparate").before(progress_html);
    }else{
        parent.append(progress_html);
    }
    dic[eleid.toString()] = new Array();
}