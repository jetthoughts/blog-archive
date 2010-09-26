title: Rails assets host with ssl
date: 19/02/2010
author: Michael Nikitochkin
tags: rails,assets

When we use simple assets server as 

    ActionController::Base.asset_host = "http://assets%d.example.com"
    
, so we have a problem with pages which used ssl and some browsers alert users,that some content is not safe.

So I found in the **google** next solution:

    ActionController::Base.asset_host = Proc.new { |source, request|
        "#{request.protocol}assets%d.example.com" % (source.hash % 4)
    }


It is beautiful, because for each image we use only one host, so when you refresh you page, a image always have example host 'assets1' in each page, not random host.
