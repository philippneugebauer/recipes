json.extract! recipe, :id, :title, :ingredients, :cook_time, :prep_time, :ratings, :author, :image_url
json.category recipe.category.name if recipe.category
json.image_thumbnail url_for(recipe.thumbnail) if recipe.thumbnail
json.image url_for(recipe.full_image) if recipe.full_image
