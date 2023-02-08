/*
1. register a list container (ul) in the constructor
2. create a render method to render a new "li" to the container
  -- accept args: invoice or payment, a heading, a position
  -- create the html template (li, h4, p)
  -- add the "li" template to start or end of the list

*/
import { Position } from "../Enum/Position.js";
export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, pos) {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        h4.innerText = heading;
        li.append(h4);
        const p = document.createElement("p");
        p.innerText = item.format();
        li.append(p);
        if (pos === Position.start) {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
