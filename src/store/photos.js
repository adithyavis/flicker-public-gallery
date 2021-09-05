import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { getPhotoSrc, getPhotoId } from '@/utils/photo';

import { NONE_TAG } from '@/constants/tag';

let cancelFetchRequestFunc;

const photosModule = {
  namespaced: true,
  state: {
    // Photos normalized according to tags, ids etc.
    photos: {
      byTags: {}, // { [tag: string]: id[]}
      byIds: {}, // { [id: string]: photo[]}
      allIds: [], // id[]
      toBeDisplayed: [], //id[]
    },
    isFetchingPhotos: false,
  },
  getters: {
    photosByIds: (state) => state.photos.byIds,
    photosToBeDisplayed: (state) =>
      state.photos.toBeDisplayed.map((id) => state.photos.byIds[id]),
    isFetchingPhotos: (state) => state.isFetchingPhotos,
  },
  mutations: {
    SET_PHOTOS(state, payload) {
      state.photos = payload.photos;
    },
    SET_IS_FETCHING_PHOTOS(state, payload) {
      state.isFetchingPhotos = payload.isFetchingPhotos;
    },
  },
  actions: {
    async fetch({ state, commit }, { tag }) {
      try {
        commit('SET_IS_FETCHING_PHOTOS', { isFetchingPhotos: true });

        let photosByTags = state.photos.byTags;
        let photosByIds = state.photos.byIds;
        let allPhotoIds = state.photos.allIds;
        let photosToBeDisplayed = state.photos.toBeDisplayed;

        if (photosByTags[tag] !== undefined) {
          // Use cached value if photos for the searched tag already exists
          photosToBeDisplayed = photosByTags[tag];
          commit('SET_PHOTOS', {
            photos: {
              ...state.photos,
              toBeDisplayed: photosToBeDisplayed,
            },
          });
        } else {
          // Cancel active fetch requests from previous dispatches
          if (cancelFetchRequestFunc) {
            cancelFetchRequestFunc();
          }

          // Fetch from API if photos for the tag don't exist
          const response = await axios({
            url: 'https://www.flickr.com/services/feeds/photos_public.gne',
            adapter: jsonpAdapter,
            callbackParamName: 'jsoncallback',
            cancelToken: axios.CancelToken((cancelFunc) => {
              cancelFetchRequestFunc = cancelFunc;
            }),
            params: {
              format: 'json',
              tags: tag !== NONE_TAG ? tag : '',
            },
          });

          const photos = response.data.items;

          // Cache any new photos in normalized format
          photos.forEach((photo) => {
            const id = getPhotoId(photo);
            if (photosByIds[id] === undefined) {
              photosByIds = {
                ...photosByIds,
                [id]: { ...photo, id, src: getPhotoSrc(photo) },
              };
              allPhotoIds = allPhotoIds.concat(id);
            }
          });

          // Set photos to be displayed
          photosToBeDisplayed = photos.map((photo) => getPhotoId(photo));

          // Cache photos for the searched tag
          photosByTags = { ...photosByTags, [tag]: photosToBeDisplayed };

          commit('SET_PHOTOS', {
            photos: {
              ...state.photos,
              byTags: photosByTags,
              byIds: photosByIds,
              allIds: allPhotoIds,
              toBeDisplayed: photosToBeDisplayed,
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        commit('SET_IS_FETCHING_PHOTOS', { isFetchingPhotos: false });
      }
    },
  },
};
export default photosModule;
