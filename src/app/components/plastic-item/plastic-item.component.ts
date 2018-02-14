import { itemres } from './../../classes/itemres';
import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LdbService } from '../../services/ldb.service';



import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-plastic-item',
  templateUrl: './plastic-item.component.html',
  styles: ['canvas { border: 1px solid #000; }']
})
export class PlasticItemComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('canvasWrapper') public canvasWrapper: ElementRef;
  @ViewChild('canvasHidden') public canvasHidden: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 800;
  @Input() public height = 250;



  private cx: CanvasRenderingContext2D;
  private cxHidden: CanvasRenderingContext2D;
  private windowsCount: number;

  public selected: {
    selectedOutsideProfiles: any,
    selectedPartitionProfile:any,
    selectedDoorProfile: any
  } = {
      selectedOutsideProfiles: null,
      selectedPartitionProfile: null,
      selectedDoorProfile: null
    };

  private windowsAr: { typeOfDoor: number }[];
  private types: number[] = [0, 1, 2, 3, 4, 5];
  private doors: number[] = [1, 2, 3, 4, 5, 6];
  private config: object;
  private totalWidth: number;
  public canShow: boolean = false;
  constructor(
    private ldbService: LdbService
  ) {


  }
  ngOnInit() {
    this.width = this.canvasWrapper.nativeElement.clientWidth - 30;

    this.ldbService.getConfig().then((data) => {
      // console.log();
      this.config = data;
      this.canShow = true;
    });

  }


  ngAfterViewInit() {

    this.initApp();

  }
  public initApp() {
    //init array()

    //console.log('view')

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    const canvasE2: HTMLCanvasElement = this.canvasHidden.nativeElement;
    this.cxHidden = canvasE2.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    canvasE2.width = this.width;
    canvasE2.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.cxHidden.lineWidth = 1;
    this.cxHidden.lineCap = 'round';
    this.cxHidden.strokeStyle = '#000';

    this.initWindowArray(1);
    //listening to click
    this.getClick(canvasEl, canvasE2);
  }
  public initWindowArray(count: number) {
    this.windowsAr = [{ typeOfDoor: 0 }];
    if (count > 1) {
      for (let i = 1; i < count; i++) {
        this.windowsAr.push({ typeOfDoor: 0 });
      }
    }
    this.clearCanvas();
    this.pDrowWindow(0, 0);
  }

  public pDrowWindow(x: number, y: number) {

    let doorsCount = this.windowsAr.length;

    let pudding = 10;
    let doorWidth = 100
    let width = 200;
    let height = 200;


    this.cx.strokeRect(x + pudding, y + pudding, doorWidth * doorsCount + (pudding * (doorsCount + 1)), height + (pudding * 2));

    for (let i = 0; i < doorsCount; i++) {
      this.cx.strokeRect(x + (doorWidth * i) + pudding * (i + 2), y + pudding * 2, doorWidth, height);
      this.cxHidden.fillStyle = 'rgb(0,0,' + (i + 1) + ')';
      this.cxHidden.fillRect(x + (doorWidth * i) + pudding * (i + 2), y + pudding * 2, doorWidth, height);

      //drow X
      if (this.windowsAr[i].typeOfDoor == 0) {
        this.cx.beginPath();
        this.cx.moveTo(doorWidth * (i + 1) + (pudding * (i + 3) - doorWidth / 2),
          pudding * 2 + height / 2 - pudding);
        this.cx.lineTo(doorWidth * i + (pudding * (i + 1) + doorWidth / 2)
          , pudding * 2 + height / 2 + pudding);
        this.cx.moveTo(doorWidth * (i + 1) + (pudding * (i + 1) - doorWidth / 2),
          pudding * 2 + height / 2 - pudding);
        this.cx.lineTo(doorWidth * i + (pudding * (i + 3) + doorWidth / 2)
          , pudding * 2 + height / 2 + pudding);
        this.cx.stroke();
      }

      //drow left
      if (this.windowsAr[i].typeOfDoor == 1 || this.windowsAr[i].typeOfDoor == 3) {
        this.cx.beginPath();
        this.cx.moveTo(doorWidth * (i + 1) + (pudding * (i + 2)), pudding * 2);
        this.cx.lineTo(doorWidth * i + (pudding * (i + 2)), pudding * 2 + height / 2);
        this.cx.lineTo(doorWidth * (i + 1) + (pudding * (i + 2)), pudding * 2 + height);
        this.cx.stroke();
      }

      if (this.windowsAr[i].typeOfDoor == 2 || this.windowsAr[i].typeOfDoor == 3 || this.windowsAr[i].typeOfDoor == 5) {
        this.cx.beginPath();
        this.cx.moveTo(doorWidth * (i + 1) + (pudding * (i + 2)), pudding * 2 + height);
        this.cx.lineTo(doorWidth * i + (pudding * (i + 2)) + doorWidth / 2, pudding * 2);
        this.cx.lineTo(doorWidth * (i) + (pudding * (i + 2)), pudding * 2 + height);
        this.cx.stroke();
      }

      if (this.windowsAr[i].typeOfDoor == 4 || this.windowsAr[i].typeOfDoor == 5) {
        this.cx.beginPath();
        this.cx.moveTo(doorWidth * (i) + (pudding * (i + 2)), pudding * 2);
        this.cx.lineTo(doorWidth * (i + 1) + (pudding * (i + 2)), pudding * 2 + height / 2);
        this.cx.lineTo(doorWidth * (i) + (pudding * (i + 2)), pudding * 2 + height);
        this.cx.stroke();
      }


    }


  }



  public clearCanvas() {
    this.cx.clearRect(0, 0, this.width, this.height);
  }
  private getClick(canvasEl: HTMLCanvasElement, canvasE2: HTMLCanvasElement) {

    Observable.fromEvent(canvasEl, 'click')
      .subscribe((res: MouseEvent) => {
        let data = this.cxHidden.getImageData(res.offsetX, res.offsetY, 1, 1).data;
        const color = `rgb(${data[0]},${data[1]},${data[2]})`;
        //    console.log(data[2])
        if (data[2] > 0 && this.windowsAr[data[2] - 1]) {
          this.windowsAr[data[2] - 1].typeOfDoor++;
          if (this.windowsAr[data[2] - 1].typeOfDoor > 5) {
            this.windowsAr[data[2] - 1].typeOfDoor = 0;
          }
          this.clearCanvas();
          this.pDrowWindow(0, 0);
        }

      })


  }



  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      // this will capture all mousedown events from teh canvas element
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          // after a mouse down, we'll record all mouse moves
          .fromEvent(canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a 'mouseup' event    
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point    
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });

  }
  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
  recountObjects(event) {
    let res = new itemres;
    console.log(this.selected)
    if (this.windowsAr.length > 0) {
      for (let i in this.windowsAr) {
        let item = this.windowsAr[i];
        if (item.typeOfDoor == 0) {
          res.emptyDoorsCount++
        } else {
          res.doorsCount++
        }
      }
    }

    console.log(this.selected.selectedOutsideProfiles.width * 2)
    console.log((this.windowsAr.length - 1) * this.selected.selectedPartitionProfile.width)
    console.log(res.emptyDoorsCount * this.selected.selectedOutsideProfiles.windowPaddingSide * 2)

    let windowglass =
      this.totalWidth -
      (this.selected.selectedOutsideProfiles.width * 2 +
        ((this.windowsAr.length - 1) * this.selected.selectedPartitionProfile.width) +
        (res.emptyDoorsCount * this.selected.selectedOutsideProfiles.windowPaddingSide * 2) +
        (res.doorsCount * 2 * (this.selected.selectedDoorProfile.width - this.selected.selectedDoorProfile.doorSideMargin + this.selected.selectedDoorProfile.windowPaddingSide))
      );
    
      let oneGlassWindow =Math.round(windowglass/this.windowsAr.length);

console.log(oneGlassWindow); 

    console.log(res);
  }

}
