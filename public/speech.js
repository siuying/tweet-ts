var Player = {
  isPlaying: false,
  url: "",
  volume: "",
  position: "",
  duration: "",
  bytesLoaded: "",
  bytesTotal: "",
  bytesPercent: "",

  init: function() {
    if ($("#player_mp3_js").length == 0) {
      var mp3Player = "<object class=\"playerpreview\" id=\"player_mp3_js\" type=\"application/x-shockwave-flash\" data=\"/flash/player_mp3_js.swf\" width=\"1\" height=\"1\">" +
          "<param name=\"movie\" value=\"/flash/player_mp3_js.swf\" />" +
          "<param name=\"AllowScriptAccess\" value=\"always\" />" +
          "<param name=\"FlashVars\" value=\"listener=Player.listeners&amp;interval=500\" />" +
      "</object>";
      $("body").append(mp3Player);
    }
  },
  
  play: function(url) {
    var player = document.getElementById("player_mp3_js");
    if (url) {
      player.SetVariable("method:setUrl", url);
    }
    player.SetVariable("method:play", "");
    player.SetVariable("enabled", "true");  
  },

  listeners: {
      onInit: function(){ this.position = 0 },
      onUpdate: function() {
        Player.isPlaying = this.isPlaying
        Player.url = this.url
        Player.volume = this.volume
        Player.position = this.position
        Player.duration = this.duration
        Player.bytesLoaded = this.bytesLoaded
        Player.bytesTotal = this.bytesTotal
        Player.bytesPercent = this.bytesPercent
      }
  }
  
};

var Speech = {
  speech: function(content) {
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
  },
  
  replacePlayer: function(url) {
    $("#loading").hide();
    Player.play(url);
    return false;
  },
  
  popupError: function(msg) {
    $("#loading").hide();
    alert(msg);
    return false;
  }
};
