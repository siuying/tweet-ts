var Speech = {};

Speech.speech = function(content) {
  $.ajax({
      type: "GET",
      url: "/speech",
      dataType: "text",
      data: ({content: content}),
      success: Speech.replacePlayer,
      error:   Speech.popupError
    });
  $("#loading").show();
  
  if (!document.all) {
    $("#loading").css("top", window.pageYOffset +"px")
  } else {
    $("#loading").css("top", document.documentElement.scrollTop +"px")
  }
  
  return false;
}

Speech.replacePlayer = function(url) {
  $("#loading").hide();
  var bgcolor  = "FFFFFF"
  var width    = "1"
  var height   = "1"
  var flash = "<object type=\"application/x-shockwave-flash\" " +
    "  data=\"/flash/dewplayer.swf?autoplay=1&son=" + encodeURI(url) + "&amp;bgcolor=" + bgcolor + "\" width=\"" + width + "\" " +
    "  height=\"" + height + "\"> " +
    "  <param name=\"movie\" value=\"/flash/dewplayer.swf?son=" + url + "&amp;bgcolor=" + bgcolor + "\" />" +
    "</object>"
  $("#result").html(flash);
  return false;
}

Speech.popupError = function(msg) {
  $("#loading").hide();
  alert(msg);
  return false;
}