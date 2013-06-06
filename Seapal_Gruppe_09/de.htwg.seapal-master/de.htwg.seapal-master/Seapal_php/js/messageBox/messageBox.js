/*Implementation of message box. Also see the corresponding css file (messageBox.css) for how to use it.*/

/*msgId: the id of the html div*/
/*txt: the text to show*/
/*width: the width, which should be big enough to display the complete text*/
/*marginLeft: set to a negative number 1/2 of your width*/
function displayMessageBox(msgId, txt, width, marginLeft) {
    //set the text of the inner div tag, which has the id of it's parent + Text
    document.getElementById(msgId+"Text").innerHTML = txt;
    document.getElementById(msgId).style.width = width;
    document.getElementById(msgId).style.marginLeft = marginLeft;
    document.getElementById(msgId).style.display = "block";
    //hide the message after some seconds
    setTimeout(function() {document.getElementById(msgId).style.display = "none";},2000);
}