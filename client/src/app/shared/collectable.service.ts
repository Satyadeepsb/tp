import {Collectable} from "./collectable.model";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {OnInit ,Injectable, } from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class CollectableService implements OnInit{
  public _url : string = "./apidata/data.json";
  public collectables  : Collectable[] = [];
  public collection: Collectable[] = [];
  public demo : any[] = [];
  public qq : any;

  constructor(private _http : Http,private  router : Router){

  }

  ngOnInit() {
  }

  getMainCollectable(){
    let body : any = {jsonData : {}};
    let header = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({headers : header,method : 'get'});
    return this._http.get(this._url,options);
  }

  getViaMlav(){
    let body : any = {jsonData : {}};
    let header = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let options = new RequestOptions({headers : header,method : 'get'});
    return this._http.get('http://localhost:3000/api/tasks',options);
  }


  getCollection(){
    return this.collection;
  }

  newAdd(item:Collectable){
    for (let value of this.collectables) {
      if(item.description === value.description){
        return;
      }
    }
    this.collectables.push(item);
    this.demo = this.collectables;
  }

  addToCollection(item : Collectable){
    if(this.collection.indexOf(item) !== -1){
      return;
    }
    this.collection.push(item);
  }

  removeFromCollection(item : Collectable){
    this.collection.splice(this.collection.indexOf(item),1);
  }



}
