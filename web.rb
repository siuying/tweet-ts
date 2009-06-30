require 'rubygems'
require 'sinatra'
require 'json'
require 'rest_client'

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
  def u(text)
    Rack::Utils.escape(text)
  end
end

get '/' do
  @user = params[:user] || "siuying"
  tweets_json = RestClient.get "http://twitter.com/statuses/user_timeline.json?screen_name=#{u(@user)}", "User-Agent" => "SpeechTweet"
  @tweets = JSON(tweets_json)
  erb :index
end

error RestClient::Unauthorized do
  "Not Authorized, user protected? "
end

get '/speech' do
  RestClient.post "http://sepc495.se.cuhk.edu.hk/cuvocal/cuvocal.api", 
    :speech_speed => 90, 
    :response => 'json', 
    :speed => options.speech_speed, 
    :action => 'synthesize', 
    :content => params[:content]
end