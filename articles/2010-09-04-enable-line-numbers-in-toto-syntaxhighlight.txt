title: Enable line numbers in Toto syntaxhighlight
author: Michael Nikitochkin
date: 04/09/2010
tags: ruby,toto

  Syntax Highlighting by [Rack::CodeHighlighter](http://github.com/wbzyl/rack-codehighlighter) gem has a bug. May be I did wrong steps. But by default __CodeRay__ disable to show line numbers for code. I did not found any options to enable it by __CodeHighlighter__. So input next lines in __config.ru__ will show line numbers.

    :::ruby
    CodeRay::Encoders["html"]::DEFAULT_OPTIONS[:line_numbers]=:inline
    
  But I have a problem with __css__. I found that __CodeHighlighter__ generate not correct html for __CodeRay__ and default theme's css for Toto broke this highlighting too. You could use my fixed [coderay.css](/css/coderay.css) for Toto.