class RecipeImportJob
  include SuckerPunch::Job

  # https://scoutapm.com/blog/which-ruby-background-job-framework-is-right-for-you
  def perform(recipe_import)
    recipe_upload_file = ActiveStorage::Blob.service.path_for(recipe_import.file.key)
    recipe_import.execute_import(recipe_upload_file)
  end
end
