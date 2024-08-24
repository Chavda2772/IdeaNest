import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsService {
  constructor() {}

  // youtube test URL's
  testUrls = [
    'https://youtube.com/shorts/dQw4w9WgXcQ?feature=share',
    '//www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0',
    'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
    'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
    'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
    'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/6dwqZw0j_jY',
    'http://youtu.be/6dwqZw0j_jY',
    'http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be',
    'http://youtu.be/afa-5HQHiAs',
    'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
    'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
    'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
    'http://www.youtube.com/embed/nas1rJpm7wY?rel=0',
    'http://www.youtube.com/watch?v=peFZbP64dsU',
    'http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player',
    'http://youtube.com/vi/dQw4w9WgXcQ?feature=youtube_gdata_player',
    'http://youtube.com/?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/watch?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player',
  ];

  // Return youtube Video Id from URL
  getVideoIdFromUrl(url: string): string {
    if (!url) return '';

    var videoDetail = url.match(
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|live\/|shorts\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11}).*/i
    );
    return videoDetail
      ? videoDetail[2].substring(0, 11)
      : new RegExp(/^[0-9A-Za-z_-]{11}$/).test(url)
      ? url
      : '';
  }

  // Return object having height and width property
  // Example usage:
  // const aspectRatio = 16 / 9;
  // const knownWidth = 1920;
  // const dimensions = calculateDimensions(aspectRatio, knownWidth, 'width');
  // console.log(`Width: ${dimensions.width}, Height: ${dimensions.height}`); 
  calculateDimensions(aspectRatio: number, dimension: number, type: string) {
    let width, height;

    if (type === 'width') {
      width = dimension;
      height = dimension / aspectRatio;
    } else if (type === 'height') {
      height = dimension;
      width = dimension * aspectRatio;
    } else throw new Error("Type must be either 'width' or 'height'");

    return { width, height };
  }
}
