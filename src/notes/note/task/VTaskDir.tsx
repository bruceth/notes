import React from 'react';
import { CNoteTask } from "./CNoteTask";
import { VNoteBaseDir } from "notes/noteBase";

export class VTaskDir extends VNoteBaseDir<CNoteTask> {
	renderContent() {
		return <>TaskDir</>;
	}
}