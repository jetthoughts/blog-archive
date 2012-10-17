--- 
title: Show not valid CSV lines with sed
date: 21/09/2010
author: Michael Nikitochkin
tags: sed,shell,csv

I have trouble with invalid formatted CSV file. First step show lines with invalid lines.

    :::text
    sed -n '/"[^",]*"[^",]*"[^",]*",/,1p' <fileName>

Then find in the google way to replace symbol inside quotes. And read next manual http://sed.sourceforge.net/sed1line.txt. So create a sed script with next content, call it as __script.sed__:

    :::text
    s/\",\"/\$XXXX\$/g;
    :a
    s/\([^,]\)"\([^,]\)/\1'\2/g
    ta
    s/\$XXXX\$/\",\"/g;

Next we just do:

    :::text
    sed -f script.sed <fileName>
    
And we get in output a normal csv format file. Next we just add the argument to apply this in this file.

    :::text
    sed -i .bak -f script.sed <fileName>