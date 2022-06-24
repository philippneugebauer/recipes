# README

## User Stories

- import recipes through JSON upload

- find recipes based on ingredients

- get a recipe proposed based on ingredients

## Database Diagram

https://stackoverflow.com/questions/3223770/tools-to-generate-database-tables-diagram-with-postgresql
https://schemaspy.org/

## Application URL

## Architecture Decisions

Ingredient data is not structured. There is quite some effort required to transform them into structured data.
Helpers like https://github.com/rrgayhart/little-recipe-parser unfortunately need an overhaul to catch all cases.
Therefore I decided to leave the data is it is. That meant for the first step also that I just keep the ingredient data inside of the recipe record in a jsonb column instead of separating it into another entity. If the JSON querying won't be fast enough, there will be another try with a separate entity and LIKE queries as the ingredient data is not structured and does not allow for simple select queries. Structured data would allow for automatic categorization e.g. based on diet requirements. Also not even every recipe has a category, around 60.

# http://www.databasesoup.com/2015/01/tag-all-things-part-2.html
# https://www.netguru.com/blog/postgres-arrays-vs-json-datatypes-in-rails-5
# https://edgeguides.rubyonrails.org/active_record_postgresql.html#array
# https://stackoverflow.com/questions/22667401/postgres-json-data-type-rails-query
# http://www.binarywebpark.com/query-json-data-rails-postgresql/
# https://blog.saeloun.com/2022/01/04/postgresql-data-types-in-rails.html
# JSONB > ARRAY because like querying

Why has category its on database and ingredients don't? My assumption is that it's very likely that categories will be soon a n:n relation considering diets and other categorization ideas. That would be a heavy and avoidable migration. Furthermore, the category based on the current requirements is not an important information and it's so far a 1:n relation. Consequently, the JOIN overhead is small and cheap. Ingredients on the other hand are very connected to the recipe. You won't display all of them without the recipe but query them. They probably will be changed rarely, maybe for a typo but that's it. A jsonb column is proven to be small and fast, faster than a normalized additional table. So I have chosen to use the jsonb column.

I have introduced sucker_punch for background jobs. This allows immediate user feedback after the upload so he doesn't need to wait for the file to be analyzed. That takes some substantial time and is annoying as a user. I've decided for sucker_punch because the file is stored on the disk so it won't be lost, even if the background job fails. The transactions ensure that either the import finishes successfully or fails completely. This allows for a simple reimport later even though this is not yet implemented. Furthermore, the in-memory and single-thread usage allows for the usage on the free tier of Heroku, where the application is supposed to be presented.

I integrated React with Rails based on the esbuild and jsbundling-rails approach which seemed to me after research the most convenient and useful way at the moment, even though importmaps and DHH's approach might change that in future.

ActiveStorage with local disk storage for simplicity of presentation and development. Normally, I would upload that to a S3 service like AWS, Wasabi etc.

#Big file import with stream/lazing loading?

#TODO: both server-side and react rendering?

#TODO: test decisions => use generated tests for controllers => no effort
since they are major points of presentation
=> test json import
=> test ingredient filtering

#TODO: lazy/stream loading?
# https://thoughtbot.com/blog/io-in-ruby
# https://www.thegnar.com/blog/ruby-io-buffer
# https://iostreams.rocketjob.io/tutorial
content = File.read(file)

#TODO: json validation? https://github.com/voxpupuli/json-schema
#TODO: Ingredients als Text?
  # => textfunktionalität von Postgres checken => Textsuche
  # => performance

## Static Code Analyzer

I have applied several code analyzers like brakeman security and rubocop. There's several findings mostly about Rails generated code about " and '. There's also the indication of a SQL injection vulnerability in `Recipe.contains_ingredients` but actually the `?` parameter application prevents that vulnerability. I even tested it with `Recipe.contains_ingredients(["corn%); DROP TABLE recipe_imports"])` and it didn't work.
