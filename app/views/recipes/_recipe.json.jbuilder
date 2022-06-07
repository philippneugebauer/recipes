json.extract! recipe, :id, :title, :ingredients, :cook_time, :prep_time, :ratings, :author, :image_url
json.url recipe_url(recipe, format: :json)
