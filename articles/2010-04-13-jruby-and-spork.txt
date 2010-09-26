title: Jruby and Spork
date: 13/04/2010
author: Michael Nikitochkin
tags: jruby,spork

When you try run spork you have to enable fork for spork (instead you will have error
<pre>
spork/forker.rb:18:in `initialize': fork is unsafe and disabled by default on JRuby (NotImplementedError)
</pre>). So it should like:

    jruby -J-Djruby.fork.enabled=true <path-to-jruby-binaries>/spork
