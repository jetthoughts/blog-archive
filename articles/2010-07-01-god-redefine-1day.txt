title: GOD redefine 1.day
date: 01/07/2010
author: Michael Nikitochkin
tags: god,rails

We add gem bundler to our rails application. So we add all gems from production server to bundle and restart app. After we find a strange thing: *1.day* return 86400. but before it returns *1.day* and if we do "Time.now.to_date + 1.day" we get a 86400 day from now.

So we research our bundler gem list, and remove not used gems for rails.