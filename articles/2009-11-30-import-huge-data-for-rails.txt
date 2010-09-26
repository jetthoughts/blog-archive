--- 
title: Import huge data for Rails
date: 30/11/2010
author: Michael Nikitochkin
tags: rake,rails,csv

I wrote simple rake task for dump data from DB to CSV file:

    :::ruby

    namespace :db do
      desc 'Create CSV fixtures from data'
      task :extract_to_csv => :environment do
        ActiveRecord::Base.establish_connection
        skip_tables = ["schema_info", "schema_migrations"]

        (ActiveRecord::Base.connection.tables - skip_tables).each do |table_name|
          FasterCSV.open("#{RAILS_ROOT}/db/fixtures/#{table_name}.csv", "w", :force_quotes => true) do |csv|
            model = table_name.classify.constantize
            csv << model.column_names
            model.all.each do |object|
              csv << model.column_names.map{|c| object.attributes[c]}
            end
          end
        end
      end
    end

And import for Postgresql:

<pre>
copy import_products from '/home/miry/import_products.csv'
          with csv header NULL AS '' QUOTE  AS  '"';
</pre>

