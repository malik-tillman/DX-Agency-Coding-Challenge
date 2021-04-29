import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  public rows = 8;
  public columns = 8;

  @ViewChild('board') board: ElementRef;
  @ViewChild('column') columnRef: ElementRef;
  @ViewChild('box') box: ElementRef;

  constructor() {
    gsap.registerPlugin(Draggable);

    window.onresize = (e) =>
    {
      if (window.innerWidth < 936) {
        this.setBoard();
      }
      else {
        this.setBoard(75, 75);
      }
    };
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setBoard(this.columnRef.nativeElement.clientHeight, this.columnRef.nativeElement.clientHeight);
  }

  setBoard(gridWidth = 35, gridHeight = 35): void {
    Draggable.create('.box', {
      type: 'x,y',
      edgeResistance: 1,
      bounds: '.board__container',
      liveSnap: true,
      snap: {
        x: (endValue) => {
          return Math.round(endValue / gridWidth) * gridWidth;
        },
        y: (endValue) => {
          return Math.round(endValue / gridHeight) * gridHeight;
        }
      }
    });

    gsap.set(this.board.nativeElement, {
      width: this.columns * gridWidth,
      height: this.rows * gridHeight,
    });

    gsap.set(this.box.nativeElement, {
      width: gridWidth,
      height: gridHeight,
      lineHeight: gridHeight + 'px'
    });
  }
}
