var style_attrs = new Array("width","height","top","left");//attributes that can be controled by style.
function renderWinMsg(){
    var window = $("#window");
    return {
        name: window.attr("name"),
        text: window.children().children(".window").text(),
        width: delete_px(window.css("width")),
        height: delete_px(window.css("height")),
        top: delete_px(window.css("top")),
        left: delete_px(window.css("left")),
        bgcolor: colorRGB2Hex(window.children(".winBody").css("background-color")),
        eleid: 0
    };
}
function renderBtnMsgs(){
    let elts = $(".element[subclass='button']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderBtnMsg(elts[i]);
    }
    return msgs;
}

function renderBtnMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: $(elt).children(".button").text(),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).children(".button").css("color")),
        bgcolor: colorRGB2Hex($(elt).children(".button").css("background-color")),
        eleid: $(elt).attr("eleid"),
        command: $(elt).attr("command")
    };
}

function renderEtrMsgs(){
    let elts = $(".element[subclass='entry']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderEtrMsg(elts[i]);
    }
    return msgs;
}

function renderEtrMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: "",
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).children(".entry").css("color")),
        eleid: $(elt).attr("eleid")
    };
}
function renderLabMsgs(){
    let elts = $(".element[subclass='label']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderLabMsg(elts[i]);
    }
    return msgs;
}
function renderLabMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: $(elt).children().text(),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).children(".label").css("color")),
        bgcolor: colorRGB2Hex($(elt).children(".label").css("background-color")),
        eleid: $(elt).attr("eleid")
    };
}

function renderFrmMsgs(){
    let elts = $(".element[subclass='frame']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderFrmMsg(elts[i]);
    }
    return msgs;
}
function renderFrmMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        bgcolor: colorRGB2Hex($(elt).css("background-color")),
        eleid: $(elt).attr("eleid")
    };
}

function renderCkbMsgs(){
    let elts = $(".element[subclass='checkbutton']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderCkbMsg(elts[i]);
    }
    return msgs;
}

function renderCkbMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: $(elt).children(".checkbutton").text(),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).css("color")),
        bgcolor: colorRGB2Hex($(elt).css("background-color")),
        eleid: $(elt).attr("eleid"),
    };
}
function renderRdbMsgs(){
    let elts = $(".element[subclass='radiobutton']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderRdbMsg(elts[i]);
    }
    return msgs;
}
function renderRdbMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: $(elt).children(".radiobutton").text(),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).css("color")),
        bgcolor: colorRGB2Hex($(elt).css("background-color")),
        eleid: $(elt).attr("eleid"),
    };
}
function renderPgbMsgs(){
    let elts = $(".element[subclass='progressbar']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderPgbMsg(elts[i]);
    }
    return msgs;
}
function renderPgbMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: "",
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        eleid: $(elt).attr("eleid"),
    };
}
function renderFdgMsgs(){
    let elts = $(".element[subclass='filedialog']");
    var msgs = new Array(elts.length);
    for(i=0;i<elts.length;i++){
        msgs[i] = renderFdgMsg(elts[i]);
    }
    return msgs;
}
function renderFdgMsg(elt){
    return {
        master: $(elt).parent().attr("name"),
        name: $(elt).attr("name"),
        text: $(elt).children(".filebutton").text(),
        width: delete_px($(elt).css("width")),
        height: delete_px($(elt).css("height")),
        top: delete_px($(elt).css("top")),
        left: delete_px($(elt).css("left")),
        fgcolor: colorRGB2Hex($(elt).children(".filebutton").css("color")),
        bgcolor: colorRGB2Hex($(elt).children(".filebutton").css("background-color")),
        eleid: $(elt).attr("eleid"),
    };
}