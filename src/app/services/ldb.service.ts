import { Injectable } from '@angular/core';

@Injectable()
export class LdbService {

  constructor() { }
  getConfig() {
   let t =   new Promise<object>((resolve, reject) => {
    resolve( {std:'asdas'}  );

  });

return t;
  }

}
