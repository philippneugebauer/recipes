FROM ruby:3.1

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client libvips42 yarn

ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

RUN mkdir /recipes
WORKDIR /recipes
COPY Gemfile /recipes/Gemfile
COPY Gemfile.lock /recipes/Gemfile.lock
RUN bundle install

COPY package.json /recipes/package.json
COPY yarn.lock /recipes/yarn.lock
RUN yarn

RUN rake assets:precompile

COPY --chown=daemon . /recipes

EXPOSE 3000

USER daemon

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
