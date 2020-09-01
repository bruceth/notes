import { CContent } from "../CContent";
import { VInput } from "./VInput";
import { VView } from "./VView";
import { observable } from "mobx";
import { EnumContentType } from "../createCContent";

export interface ListItem {
	key: number;
	text: string;
}

export class CList extends CContent {
	@observable items: ListItem[];
	itemKey: number = 1;

	init(obj:any) {
		//this.items.splice(0, this.items.length);
		if (obj) {
			this.itemKey = obj.itemKey;
			this.items = obj.items;
		}
		else {
			this.items = [];
			this.itemKey = 1;
		}
	}

	get contentType(): EnumContentType {return EnumContentType.list;}
	renderInput():JSX.Element {
		let v = new VInput(this);
		this.checkHaveNewItem = v.checkInputAdd;
		return v.render();
	}
	renderViewContent():JSX.Element {return this.renderView(VView)}

	buildObj(obj:any) {
		obj.check = this.contentType;
		obj.itemKey = this.itemKey;
		obj.items = this.items;
	}

	addItem(value: string): void {
		this.items.push({
			key: this.itemKey++,
			text: value,
		});
		this.changed = true;
	}
}
