import angular from 'angular';
import { Cache } from './cache/cache.service';
import { Http } from './http/http.service';

const infrastructure = angular.module('cfi.domain.infrastructure', [])
  .service('_cache', Cache)
  .service('_http', Http);

export default infrastructure;
