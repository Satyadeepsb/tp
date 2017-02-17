import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {CollectableService} from "../shared/collectable.service";
import {Collectable} from "../shared/collectable.model";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent  extends DialogComponent {

  collectionObject : Collectable ;

  constructor(dialogService: DialogService,private collectableService : CollectableService) {
    super(dialogService);
    this.collectionObject  = new Collectable('','');
    if(this.collectableService.qq){
      this.collectionObject= this.collectableService.qq;
    }
  }
  confirm(newCollection : Collectable) {

    this.collectableService.newAdd(newCollection);
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    console.log('aaa');
    this.result = true;
    this.close();
  }
}
