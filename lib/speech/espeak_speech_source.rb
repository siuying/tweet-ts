module Speech
  class ESpeekSpeechSource
    def initialize(url)
      @url = url
    end

    def speech(content)
      RestClient.get("#{@url}?content=#{Rack::Utils.escape content}").to_s
    end
  end
end