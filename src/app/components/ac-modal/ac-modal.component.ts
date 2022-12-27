import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { AcButtonComponent } from '../ac-button/ac-button.component';

@Component({
  selector: 'app-ac-modal',
  templateUrl: './ac-modal.component.html',
  styleUrls: ['./ac-modal.component.scss']
})
@Injectable()
export class AcModalComponent<T> {
  @Input() public title: string;
  @Input() public modalText: string;
  @Input() public buttons: AcButtonComponent[];
  @Input() public htmlTemplate: TemplateRef<T>;

  public buttonPressed(button: AcButtonComponent): void
  {
    // if (!button.isDisabled && button.action)
    // {
    //   button.action();
    // }
  }
}
