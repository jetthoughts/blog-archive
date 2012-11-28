---
author: Michael Nikitochkin
title: Multiple Likes for one page
date: 28/11/2012

To use multiple Facebook like buttons for several different products and share same page and show different images,
so we need to have uniq page url for each of
them. Because Facebook scraps the
page and look for meta tags in it.

You can use [Facebook debugger](https://developers.facebook.com/tools/debug) to check each your's page.

Facebook requires six meta tags that should be provided in shared page: `image`, `url`, `title`, `site_name`, `type`,
`admins` and `app_id`. To read more about all meta tags [here](https://developers.facebook.com/docs/reference/plugins/like/#ogtags).
To show the right image we need only:

    <meta property="og:image" content="url_to_page">

You can add it to the headers.  

First solution: Additional get params
=====================================

Generating a uniq url via additional params like: `http://www.google.com?fb_like_scrapper`.
Check it in the debugger: [debugger](https://developers.facebook.com/tools/debug/og/object?q=http%3A%2F%2Fwww.google.com%2F%fb_like_scrapper).

But don't foget to put meta tag url with same url with params to not confuse Facebook scrapper. It could use url without params if it not provided in meta tag.

    <meta property="og:url" content='<%= "#{request.protocol}#{request.host_with_port}#{request.fullpath}" -%>'/>
    <meta property="og:image" content="<%= params[:featured_id] ? Video.find(params[:featured_id].thumbnail_url) : 'default_image_url'-%>">

If you don't provide this meta tag, the scrapper will use only url provided to link button.
And the template for facebook like button would be something like:

    :::erb
    <% videos.all.each do |video| %>
      <div class="fb-like" data-href="/videos?featured_id=#{video.id}" data-send="false" data-layout="button_count" data-width="47" data-height="80"></div>
    <% end %>
  
This is the simplest method to show different images.  

Second solution: Rails dynamic routes
=====================================

Another way is add dynamic params in the route.
For example in the `routes.rb` you have line `match '/videos' => 'videos#index'`.
So we add just a dynamic param `:featured_id`

    :::ruby
    match '/videos/(:featured_id)' => 'videos#index'

In the layout add next:

    <meta property="og:image" content="<%= params[:featured_id] ? Video.find(params[:featured_id].thumbnail_url) : 'default_image_url'-%>">

and for each like button use next:

    :::erb
    <% videos.all.each do |video| %>
      <div class="fb-like" data-href="/videos/#{video.id}" data-send="false" data-layout="button_count" data-width="47" data-height="80"></div>
    <% end %>
    
    
These solutions a very close to each. So it would depends on your needs. 