title: Free cache RAM for Linux OS
date: 13/02/2010
author: Michael Nikitochkin
tags: linux,ram

For do some performance tests you want to free cache RAM example test your web server or DB.

![Before clear](/images/ram_info_before_clear.png "Before clear")



`sudo echo 3 | sudo tee /proc/sys/vm/drop_caches`

![After clear](/images/ram_after.png "After clear")

