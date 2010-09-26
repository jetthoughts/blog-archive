title: Add new conditions to Searchlogic sample by Range
date: 1/12/2009
author: Michael Nikitochkin
tags: rails,searchlogic

I am using awesome plugin searchlogic by binarylogic. But it is has some small bugs with working Postgres.

Issue: Add time interval for conditions.

We need only three small steps in file vendor/plugin/searchlogic/named_scopes/conditions.rb:
First adding conditon before line CONDITIONS = {}:
<pre>
RANGE_CONDITIONS = {
          :range => [],
          :not_range => []
}
</pre>

Second step register our conditions, write after line CONDITIONS={}:
<pre>
RANGE_CONDITIONS.each { |condition, aliases| CONDITIONS[condition] = aliases }
</pre>

Third step write our query in the method *create_primary_condition* find case and add next exprs:
<pre>
        when "range"
          scope_options(condition, column_type, "#{table_name}.#{column} > ? and #{table_name}.#{column} < ?")
        when "not_range"
          scope_options(condition, column_type, "#{table_name}.#{column} < ? and #{table_name}.#{column} > ?")
        end

</pre>
Go to console and type some query: User.created_at_range(1.month.ago, 1.day.ago)
Wuala, we have all users in that period.

