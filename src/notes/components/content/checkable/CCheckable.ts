import { observable } from "mobx";
import { EnumContentType } from "../createCContent";
import { CContent } from "../CContent";
import { VInput } from "./VInput";
import { VView } from "./VView";
import { VItem } from "./VItem";

export interface ContentCheckItem {
	key: number;
	text: string;
	checked: boolean;
}

export class CCheckable extends CContent {
	private inputingText: string;
	@observable items: ContentCheckItem[];
	itemKey: number = 1;

	get contentType(): EnumContentType {return EnumContentType.checkable;}

	init(obj:any) {
		if (obj) {
			this.itemKey = obj.itemKey;
			this.items = obj.items;
		}
		else {
			this.items = [];
			this.itemKey = 1;
		}
	}

	renderInput():JSX.Element {
		let v = new VInput(this);
		return v.render();
	}

	renderViewContent():JSX.Element {return this.renderView(VView)}
	renderDirContent():JSX.Element {return this.renderView(VItem)}

	endInput(obj:any): void {
		this.addNewItem();
		this.buildObj(obj);
	}

	protected buildObj(obj:any): void {
		obj.check = this.contentType;
		obj.itemKey = this.itemKey;
		obj.items = this.items;
	}

	toString():string { 
		return this.items?.map(v => v.text).join('\n')
	}

	initFromString(value: string) {
		if (value) {
			this.items = [];
			this.itemKey = 1;
			this.items.push(...value.split('\n').filter((v, index) => {
				return v.trim().length > 0;
			}).map((v, index) => {
				return {
					key: this.itemKey++,
					text: v,
					checked: false
				}
			}));
		}
	}

	async onCheckChange(key: number, checked: boolean) {
		let item = this.items.find(v => v.key === key);
		if (item) item.checked = checked;
		await this.onContentChanged?.();
		//await this.SetNote(false);
	}

	onItemChanged = (key: number, value: string) => {
		let item = key && this.items.find(v => v.key === key);
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
			text,
			checked: false,
		});
		this.changed = true;
		this.inputingText = undefined;
	}

	getItems():{uncheckedItems:ContentCheckItem[], checkedItems: ContentCheckItem[]} {
		let uncheckedItems:ContentCheckItem[] = [];
		let checkedItems:ContentCheckItem[] = [];
		for (let ci of this.items) {
			let {checked} = ci;
			if (checked === true) checkedItems.push(ci);
			else uncheckedItems.push(ci);
		}
		return {uncheckedItems, checkedItems};
	}
}
