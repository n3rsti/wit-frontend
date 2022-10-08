import {Component, Input, OnInit} from '@angular/core';
import {ToastOptions} from "../../interfaces/toast-options";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})


export class ToastComponent implements OnInit {

  @Input() toastList: ToastOptions[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  closeToast(index: number){
    document.querySelector(`div[data-toast-index='${index}']`)?.classList.add('opacity-0');
    setTimeout(() => {
      this.toastList.splice(index, 1);
    }, 300);

  }

}
