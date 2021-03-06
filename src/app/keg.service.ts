import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class KegService {
  kegs: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.kegs = angularFire.database.list('kegs');
  }

  getKegs(){
    return this.kegs;
  }

  findKeg(keg){
    var kegId = keg.$key
    return this.angularFire.database.object('/kegs/' + kegId);
  }

  sellPint(keg, newSize){
    var keginFB = this.findKeg(keg);
    keginFB.update({size:newSize});
  }

  sellGrowler(keg, newSize){
    var keginFB = this.findKeg(keg);
    keginFB.update({size:newSize})
  }

  sellLgGrowler(keg, newSize){
    var keginFB = this.findKeg(keg);
    keginFB.update({size:newSize})
  }

  kegInv(keg, newInv){
    var keginFB = this.findKeg(keg);
    keginFB.update({
      size:66,
      inventory: newInv
    })
  }

  editKeg(event){
    var keginFB = this.findKeg(event.keg);
    keginFB.update({
      name: event.name,
      brewery: event.brewery,
      origin: event.origin,
      price: event.price,
      alcholContent: event.abv,
      inventory: event.inv
    })
  }

  addKeg(event){
    this.kegs.push({
      name: event.name,
      brewery: event.brewery,
      origin: event.origin,
      price: event.price,
      alcholContent: event.abv,
      inventory: event.inv,
      size: 66
    })
  }

  deleteKeg(keg){
    var keginFB = this.findKeg(keg);
    keginFB.remove()
  }
}
