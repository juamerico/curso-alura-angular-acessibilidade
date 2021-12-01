import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as uuid from "uuid"
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  @Input() public disabled = false
  @Input() public value!: string
  @Input() public label: string = ""
  @Output() public valueChange = new EventEmitter<string>()
  public id !: string
  public options = YesNoButtonGroupOption
  public onChange = (value: string) => { }
  public onTouched = () => { }

  constructor(private uniqueIdService: UniqueIdService) {
    this.id = this.uniqueIdService.generateUniqueIdWithPrefix("yes-no-button-group")
  }

  public writeValue(value: string): void {
    this.value = value
    this.onChange(this.value)
    this.valueChange.emit(this.value)
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
  }

  public activate(value: string): void {
    this.writeValue(value)
  }
}

enum YesNoButtonGroupOption {
  YES = "yes",
  NO = "no"
}
