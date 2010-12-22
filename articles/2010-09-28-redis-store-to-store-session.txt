--- 
title: Redis Store to store session
date: 28/09/2010
author: Michael Nikitochkin
tags: redis,rails

I use Redis to store session and cache. And When I try cache some session values, I get exception "TypeError (can't dump TCPSocket)". I have researched this trouble. It was because session.slice('keys') return not simple Hash instance, but SessionHash. So instance method *to_hash* fix all troubles. 
Example:

    :::ruby
    Rails.cache.write("key", session.except("flash", :session_id, :_csrf_token))
    

Solution:

    :::ruby
    Rails.cache.write("key", session.except("flash", :session_id, :_csrf_token).to_hash)

