var Speech = {};

Speech.replacePlayer = function(url) {
  var bgcolor  = "FFFFFF"
  var width    = "1"
  var height   = "1"
  var flash = "<object type=\"application/x-shockwave-flash\" " +
    "  data=\"/flash/dewplayer.swf?autoplay=1&son=" + url + "&amp;bgcolor=" + bgcolor + "\" width=\"" + width + "\" " +
    "  height=\"" + height + "\"> " +
    "  <param name=\"movie\" value=\"/flash/dewplayer.swf?son=" + url + "&amp;bgcolor=" + bgcolor + "\" />" +
    "</object>"
  $("#result").html(flash);
  return false;
}

Speech.speech = function(content) {
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/speech",
      data: ({content: content}),
      success: function(msg){
        if (msg['id'] != -1) {
          Speech.replacePlayer(msg["Path"] + msg["FileName"])
        } else {
          alert("Speech Server Error: " + msg["Message"]);
        }
      }
    });  
}