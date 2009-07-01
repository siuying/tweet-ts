module Speech
  class TdcSpeechSource
    def speech(content)
      result = RestClient.post("http://tdc.putonghuaonline.com/text2speech.php", :text => content, :language => "1").to_s
      matched = result.match(/sfn=(.+)\.mp3/)
      if matched
        "http://tdc.putonghuaonline.com/#{matched[1]}.mp3"
      else
        raise SpeechSourceError.new("cannot generate voice")
      end
    end
  end
end