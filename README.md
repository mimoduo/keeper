#Oneone

> A boilerplate for plugin development

##What is Oneone?

Oneone was created based on the desire to recreate an environment like codepen within github. A little bit of dev time later and it turned into a quick boilerplate for plugin development.

##Highlights

* Gulp starter kit
* Pug and SASS compilation
* Javascript module pattern with Babel
* Complete asset watch

##Installation

Oneone uses node package manager in order to download all of the necessary build dependencies. If you haven't downloaded node before, head over to [node.js](https://nodejs.org/en/) to download the latest version of node. Once you've installed node and have downloaded Oneone, let's `cd` into the project directory and then download our dependencies using the a terminal:

```sh
cd <folder-of-Oneone>
npm install gulp-cli -g
npm install
```

##Quickstart Guide

After installing the necessary dev dependencies, edit your ./package.json file in the root of the oneone directory. The very least you'll need to change is the `name` field to your unique project name. This tells the gulpfile what data to pass to your template and what to rename the distributed files.

Next, check out both ./src/init.js and ./src/script.js. They contain some custom naming specific to oneone. These should be renamed to identify your unique project name just like what you did in the ./package.json file's `name` field.

At this point, you should be all setup! Run the `gulp` command and you're set:

```sh
gulp
```

##Created With Oneone

* [Quizquiz](https://github.com/mimoduo/Quizquiz)

##Thank You, Everyone!

Hopefully you enjoy getting your plugin up and running with Oneone. If you liked how simple Oneone is I bet you'd like my other project, [Mimogear](https://github.com/mimoduo/Mimogear) - a simple static site generator.
