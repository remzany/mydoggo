import { Component} from '@angular/core';

import { NavParams, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent{

  todos:Array<string> = [];

  constructor(public navParams : NavParams, private alert:AlertController) {  
    this.todos = this.navParams.get('value');
  }

  async add() {
    const alert = await this.alert.create({
      header: `Please add task`,
      inputs:[
        {
          name: "todo",
          type: "text"
        }
      ],
        buttons: [
          {
            text: 'Ok',
            handler: (a) => {
              this.todos.push(a.todo);
            }
          }
        ]})
        await alert.present();
  }

  delete(i:number){
    this.todos.splice(i, 1);
  }

}
