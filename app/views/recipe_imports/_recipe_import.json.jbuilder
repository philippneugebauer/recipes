json.extract! recipe_import, :id, :name, :file, :created_at, :updated_at
json.url recipe_import_url(recipe_import, format: :json)
json.file url_for(recipe_import.file)
