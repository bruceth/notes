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
	private inputingText: string;
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
		//this.checkHaveNewItem = v.checkInputAdd;
		return v.render();
	}
	renderViewContent():JSX.Element {return this.renderView(VView)}

	endInput(obj:any): void {
		this.addNewItem();
		this.buildObj(obj);
	}

	protected buildObj(obj:any): void {
		obj.check = this.contentType;
		obj.itemKey = this.itemKey;
		obj.items = this.items;
	}

	onItemChanged = (key: number, value: string) => {
		let item = this.items.find(v => v.key === key);
		if (item) {
			item.text = value;
		}
		else {
			this.inputingText = value;
		}
		this.changed = true;
	}

	addNewItem(): void {
		if (this.inputingText === undefined) return;
		let text = this.inputingText.trim();
		if (text.length === 0) return;
		this.items.push({
			key: this.itemKey++,
			text: text,
		});
		this.changed = true;
		this.inputingText = undefined;
	}
}
