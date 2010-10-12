title: Mutable branch for capistrano deploy script
date: 19/02/2010
author: Michael Nikitochkin
tags: capistrano,ruby

I always had troubles, when test new feature. I forgot to change branch in capistrano config. So I found one solution wich help me:

    set :branch, `hg branch`.chop || "default"

or for git:

    ::ruby
    set :branch, `git branch | grep '*' | sed 's/^[^a-zA-Z]*//'`.strip || "master"
    
    :::ruby
    set :branch do
      default_branch = `git branch | grep '*' | sed 's/^[^a-zA-Z]*//'`.strip
      default_tag    = `git tag | tail -n 1`.strip
      tag_or_branch = Capistrano::CLI.ui.ask "Tag or branch to deploy (make sure to push it first) (#{default_branch}|#{default_tag}): [#{default_tag}] "
      tag_or_branch = default_tag if tag_or_branch.empty?
      tag_or_branch
    end unless fetch(:branch, false)

Thats all.