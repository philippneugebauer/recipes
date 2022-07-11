# README

## User Stories

As a user, I want to be able to import my recipes into the application so that I can filter my recipes for specific ingredients.

As a user, I want to filter and to scroll through the results of my ingredient search so that I can use up the ingredients from my fridge.

As a user, I want to get proposed a recipe based on my ingredients so that I don't need to chose a recipe and can start cooking immediately.

## Database Diagram

The database diagram html can be found in the [index.html](https://github.com/philippneugebauer/recipes/blob/master/schemaspy/index.html) under `./schemaspy` and were created with [Schemaspy](https://schemaspy.org/). It must be checked out to watched in the browser.

Here can be found the [relationships](https://github.com/philippneugebauer/recipes/blob/master/schemaspy/diagrams/summary/relationships.real.large.png) and [orphan](https://github.com/philippneugebauer/recipes/tree/master/schemaspy/diagrams/orphans) diagrams.

```
docker run -v "$PWD/schemaspy:/output" -v "$PWD/schemaspy.properties:/schemaspy.properties" schemaspy/schemaspy
```

## Application URL

The hosted application on Heroku can be found [here](https://stormy-citadel-28410.herokuapp.com/). Unfortunately, I encountered several limitations considering the free tier of Heroku. The provided JSON has more then 10,000 recipes which makes the database read-only. It also prevents downloading and providing the images within the application since that's also another database record.

## Architectural Decisions

I decided to leave the ingredient data unstructured. There is more effort required as I initally expected to transform them into structured data. Helpers like https://github.com/rrgayhart/little-recipe-parser need an extensive overhaul to catch all cases.
While I experimented in the beginning to separate the indications of measurement from the ingredients, I decided to revert that and move the ingredient data back inside a jsonb column of the recipe record instead of separating it into another entity. The JSON querying is fast enough to prevent blocking the application so there was no other try needed to overcome potential performance problems. I also tried out Postgres arrays but I couldn't find a way to allow like queries within them to filter for the ingredients. My research ([1](http://www.databasesoup.com/2015/01/tag-all-things-part-2.html), [2](https://www.netguru.com/blog/postgres-arrays-vs-json-datatypes-in-rails-5), [3](http://www.binarywebpark.com/query-json-data-rails-postgresql/)) also indicated that the performance difference between jsonb and arrays is neglectable.

Why has category its own database column and ingredients don't? My assumption is that it's very likely that categories will be soon a n:n relation considering diets and other categorization ideas based on my experience from my last job with a product information management system. That would be a heavy and avoidable migration. Furthermore, the category based on the current requirements is not an important information and it's so far a 1:n relation. Consequently, the JOIN overhead is small and cheap. Ingredients on the other hand are very connected to the recipe. You won't display all of them without the recipe but query them. They will be changed rarely, probably only for a typo. A jsonb column is proven to be small and fast, faster than a normalized additional table. So I have chosen to use the jsonb column.

I have introduced sucker_punch for background jobs. This allows immediate user feedback after form submission so he doesn't need to wait for the file to be processed. That takes some substantial time and is annoying for the user. The import index still allows the see the result of the import process. I've decided for sucker_punch because the file is stored on the disk so it won't be lost, even if the background job fails. The transactions ensure that either the import finishes successfully or fails completely. This would allow for a simple reimport later even though this is not implemented. Furthermore, the in-memory and single-thread usage allows for the usage on the free tier of Heroku, where the application is supposed to be presented.

I integrated React with Rails based on the esbuild and jsbundling-rails approach which seemed to me based on my research the most convenient and useful way at the moment, even though importmaps and DHH's approach might change that in future.

ActiveStorage is used with local disk storage for simplicity of presentation and development. For a production application, I would suggest S3 providers like AWS or Wasabi.

## Master Key

It is not advisable to upload the master key into source control, but `rails assets:precompile` needs it. The only way without uploading I found is putting the precompile step into the startup script since then the env set with Heroku are available. There's unfortunately no way they are provided at build time as well.

## Image Preprocessing

Google Lighthouse detected lots of performance optimizations, especially about the image delivery. They are all quite big (>1024x800 px) which is not needed in this application. Therefore, I implemented another mechanism to download the images and to resize them based on the requirements of the different pages. Unfortunately, the Postgres column limitation of 10,000 of the free tier in Heroku prevent this solution to be applied there. The application falls back then to image_url provided by the json of there is no uploaded image. Still, the implemented solution executed partially on Heroku solved the image delivery critique of Lighthouse. Since it's not usuable on Heroku, the current solution is very basic and needs further work for production usage, like daily/hourly scheduled calls, timeouts and non processing and manual reviews of process crashing pictures which all was left out due to the size of the work scope.

## No Pagination

Google and other search machines as well as general UX opinion indicates that most people don't search for all entries, so I decided to limit all results to 50 to prevent performance problems due to the picture loading.

## Site Checkers

### Accessibility Checker

The application scores 95. The detailed result can be found [here](https://www.accessibilitychecker.org/audit/?website=https%3A%2F%2Fstormy-citadel-28410.herokuapp.com&flag=ge).

### Google Lighthouse

The application scores 72 for performance, with heaviest issues related to the big images, 100 for accessibility, 100 for best practices and 82 for SEO. Detailed results can be found [here](https://github.com/philippneugebauer/recipes/blob/master/docs/lighthouse.pdf).

## Tests

I've decided to only test the major points of the application as it's a prototype. Therefore, I tested the json import and the full index as well as filtering for recipes with `bacon` as input.

## JSON Processing and File Loading

While the provided file is fine to be processed at once, that might change for bigger files. Using stream loading could be an option for that ([1](https://thoughtbot.com/blog/io-in-ruby), [2](https://www.thegnar.com/blog/ruby-io-buffer), [3](https://iostreams.rocketjob.io/tutorial)).

Currently, the application will just fail for a non-compliant json file. This works, but a [json validator](https://github.com/voxpupuli/json-schema) could be an option to provide better feedback for the user and enable a better UX. A step in between would be to described the expected JSON structure.

## Static Code Analyzer

I have applied several code analyzers like brakeman security and rubocop. There's several findings mostly about Rails generated code about " and '. There's also the indication of a SQL injection vulnerability in `Recipe.contains_ingredients` but actually the `?` parameter application prevents that vulnerability. I even tested it with `Recipe.contains_ingredients(["corn%); DROP TABLE recipe_imports"])` and it didn't work.
