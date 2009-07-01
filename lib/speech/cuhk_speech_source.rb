module Speech
  class CuhkSpeechSource
    def speech(content)
      json = RestClient.post("http://sepc495.se.cuhk.edu.hk/cuvocal/cuvocal.api", 
        :response => 'json', 
        :speed => 90, 
        :action => 'synthesize', 
        :content => content).to_s
      msg = JSON(json)

      if msg['id'] == "-1"
        raise SpeechSourceError.new(msg['error'])
      else
        msg["Path"] + msg["FileName"]
      end
    end
  end
end