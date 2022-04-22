import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core'

const {Storage} = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  users: User[];

  id: number;
  name: string;

  constructor() {
    this.readUsers();

  }

  saveUser(){
    const user = new User(this.id, this.name);
    if(this.name != "" && this.name != null && this.id != null){
      this.setObject(JSON.stringify(user.id), user);
      this.id = null;
      this.name = "";
    }else{
      alert("Name and Id cannot be empty");
    }
  }

  async setObject(key: string, value: any){
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    })
    this.readUsers()
  }

  async readUsers(){
    this.users = [];
    const {keys} = await Storage.keys();
    keys.forEach(this.getUser, this);
  }

  async getUser(key){
    const item = await Storage.get({ key: key });
    let user = JSON.parse(item.value);
    this.users.push(user);
  }

  async deleteUser(index){
    let user = this.users[index];
    await Storage.remove({key:JSON.stringify(user.id)});
    this.readUsers();
  }
}

export class User{
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}
