// MP3 Player
var Player = {
  isPlaying: false,
  position: "",
  duration: "",

  init: function() {
    if ($("#player_mp3_js").length == 0) {
      var mp3Player = "<object class=\"playerpreview\" id=\"player_mp3_js\" type=\"application/x-shockwave-flash\" data=\"/flash/player_mp3_js.swf\" width=\"1\" height=\"1\">" +
          "<param name=\"movie\" value=\"/flash/player_mp3_js.swf\" />" +
          "<param name=\"AllowScriptAccess\" value=\"always\" />" +
          "<param name=\"FlashVars\" value=\"listener=Player.listeners&amp;interval=500&amp;useexternalinterface=1\" />" +
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
      onUpdate: function(e) {
        if (Player.isPlaying == "true" && this.isPlaying == "false") {
          try{
            Player.onStopped();
          }catch(e){}
        }
        Player.isPlaying = this.isPlaying
        Player.position = this.position
        Player.duration = this.duration
      }
  },
  onStopped: function() {
  }

};

// Floating Loading Message
var Loading = {
  loading: function(isLoading){
    if (isLoading) {
      $("#loading").show();
      if (!document.all) {
        $("#loading").css("top", window.pageYOffset +"px")
      } else {
        $("#loading").css("top", document.documentElement.scrollTop +"px")
      }
    } else {
      $("#loading").hide();
    }
  }
};

// Play speech
var Speech = {    
  speech: function(messages) {
    var message     = $.isArray(messages) ? messages.shift() : messages
    var myMessages  = $.isArray(messages) ? messages : []

    $.ajax({
        type: "GET",
        url: "/speech",
        dataType: "text",
        data: ({content: message}),
        success: function(url){
          // if successfully resolve the message as MP3, play it
          Loading.loading(false);
          Player.play(url);

          // if there are remaining messages, speak them after this message is played
          Player.onStopped = function() {
            if (myMessages.length > 0) {
              Speech.speech(myMessages);
            }
          };          
        },
        error:   Speech.onError
      });

    Loading.loading(true);
    return false;
  },

  onError: function(msg) {
    Loading.loading(false);
    alert(msg);
    return false;
  }
};
