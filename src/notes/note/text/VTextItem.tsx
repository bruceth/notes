import { CNoteText } from "./CNoteText";
import { VNoteBaseView } from "../../noteBase";

export class VTextItem<T extends CNoteText> extends VNoteBaseView<T> {
	protected renderContentBase() {
		return this.controller.cContent.renderItemContent();
	}
}
