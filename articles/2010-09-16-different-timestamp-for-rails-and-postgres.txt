title: Different timestamp for Rails and Postgres
date: 16/09/2010
author: Michael Nikitochkin
tags: time,spec,db,postgres

Today I found a discrepancy in Rails timestamp and Postgres timestamp for my specs:

    :::ruby
    puts Time.now.to_i
    puts ActiveRecord::Base.connection.execute("SELECT LOCALTIMESTAMP as c1")[0]["c1"].to_time(:local).to_i

But for console timestamps are the same. Why it is not working for specs, I dont know.