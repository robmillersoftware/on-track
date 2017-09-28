import { rootUrl, videoUrl, videos, guides } from './help.constants.js';

export default class HelpController {
  constructor($sce) {
    'ngInject';
    this.$sce = $sce;

    this.videos = videos.map(({ name, file }) => ({
      name,
      file: `${videoUrl}${file}`
    }));

    this.guides = guides.map(({ name, file }) => ({
      name,
      file: `${rootUrl}${file}`
    }));
  }

  $onInit() {
    this.playVideo(this.videos[0].file);
  }

  playVideo(uri) {
    this.videoUrl = this.$sce.trustAsResourceUrl(uri);
  }
}
