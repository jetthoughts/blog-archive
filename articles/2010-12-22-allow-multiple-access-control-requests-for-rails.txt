--- 
title: Allow multiple access control requests for Rails
date: 22/12/2010

If you have problem with sending XHR requests from different domains, you find trouble to get content, because

    XMLHttpRequest cannot load http://different.domain.local:3000/visits. Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin.

The solution is to setup response headers: _Access-Control-Request-Method_, _Access-Control-Allow-Origin_.

    :::ruby
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Request-Method'] = '*'

Example for rails:

    :::ruby
    #app/application_controller.rb
    after_filter :set_access_control_headers

    def set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Request-Method'] = '*'
    end