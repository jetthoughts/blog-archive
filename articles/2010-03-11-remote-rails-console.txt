title: Remote Rails Console
date: 1/03/2010
author: Michael Nikitochkin
tags: capistrano,git,mercurial

Many times we want execute some commands in remote servers. We login to server, change directory, run script/console. Thanks to Capistrano we could only add next snippet to *config/deploy.rb* of our rails app:

    :::ruby
    desc "remotely console"
    task :console, :roles => :app do
      input = ''
      run "cd #{current_path} && ./script/console #{rails_env}", :once => true do |channel, stream, data|
        next if data.chomp == input.chomp || data.chomp == ''
        print data
        channel.send_data(input = $stdin.gets) if data =~ /^(>|\?)>/
      end
    end

And then when we need remote console, just run: `cap console`
