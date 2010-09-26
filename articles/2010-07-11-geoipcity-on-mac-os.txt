title: Geoip_city on Mac OS
date: 11/07/2010
author: Michael Nikitochkin
tags: geoip,ruby,gem

Today, I spent a time to install gem *geoip_city*. So what did I do:

* Get latest version of GeoIP C Api from <http://geolite.maxmind.com/download/geoip/api/c/>
<pre>
    wget http://geolite.maxmind.com/download/geoip/api/c/GeoIP-1.4.6.tar.gz
    tar zxf GeoIP-1.4.6.tar.gz
    cd GeoIP-1.4.6
</pre>

* Read file *README.OSX*. Found simple instructions to compile this lib.
<pre>
    export GEOIP_ARCH='-arch i386 -arch x86_64 -arch ppc -arch ppc64'
    export MACOSX_DEPLOYMENT_TARGET=10.4
    export LDFLAGS=$GEOIP_ARCH
    export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.4u.sdk $GEOIP_ARCH"
    ./configure --disable-dependency-tracking
    perl -i.bak -pe'/^archive_cmds=/ and !/\bGEOIP_ARCH\b/ and s/-dynamiclib\b/-dynamiclib \\\$(GEOIP_ARCH)/' ./libtool
    make
</pre>

* When run all this stuff, I did not get a success result, I still have a error when install gem.

* show available SDKs in you host
 <pre>ls /Developer/SDKs </pre>
 I got two: MacOSX10.5.sdk     MacOSX10.6.sdk

* So change line in readme file
before
<pre>export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.4u.sdk $GEOIP_ARCH"</pre>
to
<pre>export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.6.sdk $GEOIP_ARCH"</pre>

* and execute all steps from README file.

* but found a problem in step configure:
<pre>
% ./configure --disable-dependency-tracking
checking for gcc... gcc
checking for C compiler default output file name...
configure: error: C compiler cannot create executables
See `config.log' for more details.
</pre>

* I choose another SDK and set to "MacOSX10.5.sdk"

* run again all steps

* then install gem and all works fine

if you have troubles to install gem and still see next message:
<pre>
checking for GeoIP_record_by_ipnum() in -lGeoIP... no
you must have geoip c library installed!
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of
necessary libraries and/or headers.  Check the mkmf.log file for more
details.  You may need configuration options.

Provided configuration options:
     --with-opt-dir
     --without-opt-dir
     --with-opt-include
     --without-opt-include=${opt-dir}/include
     --with-opt-lib
     --without-opt-lib=${opt-dir}/lib
     --with-make-prog
     --without-make-prog
     --srcdir=.
     --curdir
     --ruby=/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby
     --with-geoip-dir
     --without-geoip-dir
     --with-geoip-include
     --without-geoip-include=${geoip-dir}/include
     --with-geoip-lib
     --without-geoip-lib=${geoip-dir}/lib
     --with-GeoIPlib
     --without-GeoIPlib
</pre>

So you should add include /usr/local/lib to DYNLD_LIBRARY_PATH. Or do next:
in step of configuration do  ./configure --disable-dependency-tracking  --prefix=/opt/GeoIP
and then next steps from README. I suggest do *make clean* before each compiles.
And then *sudo gem install geoip_city -- --with-geoip-dir=/opt/GeoIP* to install gem.
