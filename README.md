# Flickr Public Gallery

## Overview

I created a single page VueJS application that fetches public images from flickr and display them in a grid. Upon clicking a displayed image, a dialog containing more info about the image opens.

[Live Demo](https://flicker-public-gallery.vercel.app/)

![Flickr Public Gallery](https://media.giphy.com/media/jjOl6jhVWBZdqjJJQq/giphy.gif?cid=790b761135dcfae1c7d3002e79237215c2fea1e3d0c3a55f&rid=giphy.gif&ct=g)

## Details

- The images data are fetched from the flickr photos_public endpoint: https://www.flickr.com/services/feeds/docs/photos_public. Since www.flickr.com doesn't support CORS headers, XMLHttpRequests from the browser are blocked. In lieu of that, the images data are fetch using JSONP.
  Read more: https://github.com/github/fetch/issues/280
- Since the data returned by the API doesn't contain id information for image, a custom id of the form `{server-id}_{id}_{secret}_{size-suffix}.jpg` is assigned to each image.
  Read more: https://www.flickr.com/services/api/misc.urls.html
- Images data pertaining to a particular tag can be fetched. In order to make sure no duplicate fetch requests are made, already fetched images data is cached in the vuex store.
- Images data is normalized before being stored.
  Read more: https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
- When toggling between the tags frequently, active fetch requests from previous tags can cause stale data to be displayed. Therefore, active fetch requests are cancelled before fetching images data for a new tag. Although I haven't used debouncing, it can be helpful too.
- Images are lazily loaded.

## Project details

- Component library: vuetify
- Centralized store: vuex
- Routing: vue-router
- Code formatter: prettier
- Linting: eslint
- Preprocessor: sassCSS

## Global dependencies

- node: tested for v12.18.1
- npm: tested for 6.14.5
- prettier: tested for 2.3.2

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```
