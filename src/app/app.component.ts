import { Component } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';
import { HotTableRegisterer,HotTableModule } from '@handsontable/angular'
import { print } from 'printing'
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hotId: string = 'tempID';
  printHotId:string = "printTempID"
  numberOfRows:number = 1000
  numberOfCols:number = 26;
  tableSettings: {};
  hotInstance: any
  printInstance: any
  dataset = [[]]
  printDataSet = [[]]
  title = 'Wijmo Starter App';
  data = this.getData();
  displayPrintTable:boolean=false;
  printCols:number = 0
  printRows:number = 0
  constructor(private hotRegisterer: HotTableRegisterer) {
    this.printInstance = print;
  }

  ngOnInit() {
    

  }
  ngAfterViewInit(){
    this.hotInstance = this.hotRegisterer.getInstance(this.hotId);
    this.hotInstance.addHook('afterChange', this.afterChangeSheetCallback)
  }
  afterChangeSheetCallback(changes) {
    let rowRange = parseInt($("#rowRange").val());
    let colRange = parseInt($("#colRange").val());
    changes.forEach(([row, prop, oldValue, newValue]) => {
      if(prop>colRange) $("#colRange").attr('value', prop);
      if(row>rowRange) $("#rowRange").val(row.toString())
    });
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
    this.printDataSet = this.hotInstance.getData()
    this.printRows = parseInt($("#rowRange").val());
    this.printCols = parseInt($("#colRange").val());
    let data       = this.hotInstance.getData()
    this.printDataSet = data;
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
    this.displayPrintTable = true;
    let self = this;
    setTimeout(function(){self.printSheet(options)},1000)
     
  }
  printSheet(options){
    let self = this;
    const target = document.getElementById(this.printHotId)
    this.printInstance(target, options).then(()=>{
      this.displayPrintTable = false;
    })
    
  }
}