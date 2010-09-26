title: Convert BPlist to XML
date: 14/02/2010
author: Michael Nikitochkin
tags: macos,plist,xml,bplist

Convert Mac OS preference files to xml:

    plutil -convert xml1 path/to/preferences.plist

Then open *path/to/preferences.plist* and see XML formated file. Do some changes and
convert back:

    plutil path/to/preferences.plist
