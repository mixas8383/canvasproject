import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-plastic-item',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
  // styleUrls: ['./plastic-item.component.css']
})
export class PlasticItemComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    // this.captureEvents(canvasEl);
    //  this.drawOnCanvas({x:10,y:10},{x:110,y:10});
    //  this.drawOnCanvas({x:110,y:10},{x:110,y:210});
    //  this.drawOnCanvas({x:110,y:210},{x:10,y:210});
    //  this.drawOnCanvas({x:10,y:210},{x:10,y:10});
    this.pDrowWindow(0, 0);

  }

  public pDrowWindow(x: number, y: number) {
    let pudding = 10;
    let width = 200;
    let height = 200;


    this.cx.strokeRect(x + pudding, y + pudding, width + (pudding * 3), height + (pudding * 2));
    this.cx.strokeRect(x + pudding * 2, y + pudding * 2, width / 2, height);
    this.cx.strokeRect(x + 100 + (pudding * 3), y + pudding * 2, width / 2, height);
    this.cx.beginPath();

    this.cx.moveTo(width + (pudding * 3), pudding * 2);
    this.cx.lineTo(width / 2 + (pudding * 3), pudding * 2 + height / 2);
    this.cx.lineTo(width + (pudding * 3), pudding * 2 + height);
    this.cx.stroke();



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

}
