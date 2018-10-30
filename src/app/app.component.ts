import { Component } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';
import { HotTableRegisterer } from '@handsontable/angular'
import { print } from 'printing'
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hotId: string = 'tempID';
  tableSettings: {};
  hotInstance: any
  printInstance: any
  dataset = [[]]
  title = 'Wijmo Starter App';
  data = this.getData();
  constructor(private hotRegisterer: HotTableRegisterer) {
    this.printInstance = print;
  }

  ngOnInit() {
  }

  getData() {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
      data = [];
    for (var i = 0; i < countries.length; i++) {
      data.push({
        country: countries[i],
        sales: Math.random() * 10000,
        expenses: Math.random() * 5000,
        downloads: Math.round(Math.random() * 20000),
      });
    }
    return new CollectionView(data);
  }

  iconClickHandle(item) {
    console.log(this.dataset);
  }

  dumpData() {
    console.log(this.dataset);
  }

  redoPage() {
    this.hotInstance = this.hotRegisterer.getInstance(this.hotId);
    this.hotInstance.redo()
  }
  undoPage() {
    this.hotInstance = this.hotRegisterer.getInstance(this.hotId);
    this.hotInstance.undo()
  }
  printPage() {
    // setTimeout($.unblockUI, 2000);
    const options = {
      // modify DOM before print
      beforePrint(window) { },
      // paper direction, default is 'vertical'
      direction: 'vertical',
      // scan and apply specified styles, default is true (all styles)
      scanStyles: true,
      // inject css, default is ''
      css: '',
      // inject all links and styles from source page, default is false
      injectGlobalCss: false,
    }
    const target = document.getElementById(this.hotId)
    // print
    this.printInstance(target, options).then(() => {
      // after print
    })
  }
}
