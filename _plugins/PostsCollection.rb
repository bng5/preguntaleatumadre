module Jekyll
  module PostsCollection
    def posts_collection(collection)
      collection.map do | post |
        Hash[
          "title" => post.title,
          "file" => post.file,
          "fecha" => post.fecha,
          "date" => post.date,
          "length" => post.length,
          "episode" => post.episode,
          "duration" => post.duration,
          "url" => post.url,
          "slug" => post.slug,
        ]
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::PostsCollection)
