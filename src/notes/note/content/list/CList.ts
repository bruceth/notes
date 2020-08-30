import { CContent } from "../CContent";
import { VInput } from "./VInput";
import { VView } from "./VView";
import { observable } from "mobx";

export interface ListItem {
	key: number;
	text: string;
}

export class CList extends CContent {
	@observable items: ListItem[] = [];
	itemKey: number = 1;

	init(obj:any) {
		this.items.splice(0, this.items.length);
		this.itemKey = obj.itemKey;
		this.items.push(...obj.items);
	}

	renderInput():JSX.Element {return this.renderView(VInput)}
	renderContent():JSX.Element {return this.renderView(VView)}

	buildObj(obj:any) {
		obj.check = this.checkType;
		obj.itemKey = this.itemKey;
		obj.items = this.items;
	}

	addItem(value: string): void {
		this.items.push({
			key: this.itemKey++,
			text: value,
		});
	}
}
