import React from "react";
import { CNoteText } from './CNoteText';
import { VNoteBaseAdd } from "notes/noteBase";

export class VTextAdd extends VNoteBaseAdd<CNoteText> {
	header() {return '新建文字单'}

}
