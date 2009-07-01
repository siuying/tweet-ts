path = File.expand_path(File.dirname(__FILE__))
$:.unshift(path) unless $:.include?(path)

require 'speech/base'
require 'speech/cuhk_speech_source'
require 'speech/tdc_speech_source'