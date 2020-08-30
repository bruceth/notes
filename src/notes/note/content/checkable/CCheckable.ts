import { CContent } from "../CContent";
import { VInput } from "./VInput";
import { VView } from "./VView";
import { observable } from "mobx";

export interface CheckItem {
	key: number;
	text: string;
	checked: boolean;
}

export class CCheckable extends CContent {
	@observable items: CheckItem[] = [];
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

	async onCheckChange(key: number, checked: boolean) {
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = checked;
		await this.onContentChanged();
		//await this.SetNote(false);
	}

	addItem(value: string): void {
		this.items.push({
			key: this.itemKey++,
			text: value,
			checked: false,
		});
	}
}
