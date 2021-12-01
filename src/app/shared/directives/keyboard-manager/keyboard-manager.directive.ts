import { ContentChildren, Directive, HostListener, QueryList } from "@angular/core";
import { KeyboardManagedItemDirective } from "./keyboard-managed-item.directive";

@Directive({
  selector: "[appKm]"
})
export class KeyboardManagerDirective {

  @ContentChildren(KeyboardManagedItemDirective) public items!: QueryList<KeyboardManagedItemDirective>

  @HostListener("keyup", ["$event"])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        this.moveFocus(ArrowDirection.RIGHT).focus()
        console.log("up")
        break
      case "ArrowDown":
        this.moveFocus(ArrowDirection.LEFT).focus()
        console.log("down")
        break
      case "ArrowRight":
        this.moveFocus(ArrowDirection.RIGHT).focus()
        console.log("right")
        break
      case "ArrowLeft":
        this.moveFocus(ArrowDirection.LEFT).focus()
        console.log("left")
        break
    }
  }

  public moveFocus(arrowDirection: ArrowDirection): KeyboardManagedItemDirective {
    const items = this.items.toArray()
    const currentSelectedIndex = items.findIndex(i => i.isFocused())
    const targetElementFocus = items[currentSelectedIndex + arrowDirection]

    if (targetElementFocus) {
      return targetElementFocus
    }

    return arrowDirection === ArrowDirection.LEFT
      ? items[items.length - 1]
      : items[0]
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
}
