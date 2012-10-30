title: Add current date to text document
date: 2011/04/04
author: Michael Nikitochkin
tags: mac,applescript

Often we need to add current date to text document.  For Mac users we have awesome tools as Automator and  AppleScript.
We need to do five simple steps:

__1)__ Create a new workflow with template "Service" in Automator

__2)__ Choose 'Service receives' to "no input" in "any application"

__3)__ Add action "Run AppleScript" with content:


    :::text
    on run {input, parameters}
      tell application "System Events"
        keystroke (short date string of (current date))
      end tell
      return input
    end run

__4)__ Save the service

__5)__ Go To "System Preferences -> Keyboard -> Keyboard Shortcuts -> Services" and setup a shortcut for the service and enable it.