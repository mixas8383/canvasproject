import { Injectable } from '@angular/core';

@Injectable()
export class LdbService {

  constructor() { }
  getConfig() {
    let t = new Promise<object>((resolve, reject) => {
      resolve({
        outsideProfiles: [{
          id: 1,
          title: 'First profile title',
          length: 6500,
          width: 50,
          windowPaddingTop: 5,
          windowPaddingSide: 5
        }],
        partitionProfile: [{
          id: 1,
          title: 'First partition title',
          length: 6500,
          width: 40,
          windowPaddingTop: 5,
          windowPaddingSide: 5
 
        }],
        doorProfile: [{
          id: 1,
          title: 'First door title',
          length: 6500,
          width: 50,
          windowPaddingTop: 5,
          windowPaddingSide: 5,
          doorTopMargin: 10,
          doorSideMargin: 10
        }]
      });

    });

    return t;
  }

}
