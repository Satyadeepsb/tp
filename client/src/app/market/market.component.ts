import { Component, OnInit } from '@angular/core';
import {Collectable} from "../shared/collectable.model";
import {CollectableService} from "../shared/collectable.service";
import {Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {ConfirmComponent} from "../confirm/confirm.component";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
})
export class MarketComponent implements OnInit {
  collectables : Collectable[] = [];
  img : string ;

  onAddToCollection(item : Collectable){
      this.collectableService.addToCollection(item);
  }

  constructor(private collectableService : CollectableService,private route : Router,private dialogService:DialogService) {

    this.collectableService.getMainCollectable().subscribe(
      response=> {
        let res =response.json();
        this.collectableService.collectables= res;
        if(this.collectableService.demo.length <= 0){
          this.collectables = this.collectableService.collectables;
        }else {
          this.collectables = this.collectableService.demo;
          this.collectableService.collectables =this.collectableService.demo
        }
      },
      error=> {
        console.log('error');
      },
      ()=> {
        console.log(this.collectables);
      }
    );

    this.collectableService.getViaMlav().subscribe(
      response=> {
        let nres =response.json();
       console.log(nres);
      },
      error=> {
        console.log('error');
      },
      ()=> {
        console.log(this.collectables);
      }
    );


  }

  onEditCollection(item : Collectable){
    this.collectableService.qq= item;
      this.route.navigate(['/add']);

  }

  removeItem(item : Collectable){
    this.collectableService.removeFromCollection(item);
  }

  editItem(item : Collectable){

    let disposable = this.dialogService.addDialog(ConfirmComponent,
      {
      title: item.description,
      message: item.type
      })
      .subscribe((isConfirmed)=>{
        //We get dialog result
        if(isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }
      });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(()=>{
      disposable.unsubscribe();
    },10000);
  }


  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirm title',
      message:'Confirm message'})
      .subscribe((isConfirmed)=>{
        //We get dialog result
        if(isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }
      });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(()=>{
      disposable.unsubscribe();
    },10000);
  }


  ngOnInit() {
    this.img ="../../apidata/1.jpg";
  }

}
