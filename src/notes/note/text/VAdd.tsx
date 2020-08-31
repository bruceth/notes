import React from "react";
import { CNoteText } from './CNoteText';
import { VNoteForm } from "../views/VNoteForm";

export class VAdd extends VNoteForm<CNoteText> {
	header() {return '新建文字单'}

	content() {
		return <div className="bg-white">
			{this.renderTitleInput()}
			{this.controller.cContent.renderInput()}
		</div>;
	}
}
