import { CNoteText } from "./CNoteText";
import { VNoteBase } from "../../noteBase";

export class VTextItem<T extends CNoteText> extends VNoteBase<T> {
	protected renderContentBase() {
		return this.controller.cContent.renderItemContent();
	}
}
