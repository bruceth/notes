import React from "react";
import { CNoteText } from './CNoteText';
import { VAddNoteBase } from "../views/VAddNoteBase";

export class VAdd extends VAddNoteBase<CNoteText> {
	header() {return '新建文字单'}

}
