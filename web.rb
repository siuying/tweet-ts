require 'rubygems'
require 'sinatra'
require 'json'
require 'rest_client'
require 'lib/speech'

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
  def u(text)
    Rack::Utils.escape(text)
  end
end

configure do
  set :speacker, Speech::CuhkSpeechSource.new
end

get '/' do
  @user = params[:user] || "siuying"
  tweets_json = RestClient.get "http://twitter.com/statuses/user_timeline.json?screen_name=#{u(@user)}", "User-Agent" => "SpeechTweet"
  @tweets = JSON(tweets_json)
  erb :index
end

get '/speech' do
  options.speacker.speech(params[:content])
end

error RestClient::Unauthorized do
  "Not Authorized, user protected? "
end

error Speech::SpeechSourceError do
  "Speech server error "
end