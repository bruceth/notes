import { ListInputBase } from "../ListInputBase";
import { ContentCheckItem } from "./CCheckable";

export class CheckableListInput extends ListInputBase<ContentCheckItem> {
	protected getItemKey(item:ContentCheckItem): number {return item.key}
	protected getItemText(item:ContentCheckItem): string {return item?.text}
	protected setItemText(item:ContentCheckItem, text:string): void {if (item) {item.text = text}}
	protected newItem(key:number, text:string): ContentCheckItem {return {key, text, checked:false}};
}
