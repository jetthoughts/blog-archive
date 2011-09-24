title: Change Factory Girl directory path for Rails 3 generator
date: 24/09/2011
author: Michael Nikitochkin
tags: rails,rspec

After setup rails 3.1 + Rspec + FactoryGirl, all factories are generated to __test/factories__ instead __spec/factories__.
Solution is to add to your __application.rb__:

    g.fixture_replacement :factory_girl, :dir => 'spec/factories'

So we have:

    :::ruby
    config.generators do |g|
      g.template_engine :haml
      g.test_framework :rspec, :fixture_replacement => :factory_girl, :views => false, :helper => false
      g.view_specs false
      g.helper_specs false
      g.fixture_replacement :factory_girl, :dir => 'spec/factories'
    end