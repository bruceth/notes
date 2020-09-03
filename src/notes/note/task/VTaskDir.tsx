import React from 'react';
import { CNoteTask } from "./CNoteTask";
import { VNoteBaseDir } from "notes/noteBase";

export class VTaskDir<T extends CNoteTask> extends VNoteBaseDir<T> {
	renderContent() {
		return <>TaskDir   dd</>;
	}

	protected renderCaption() {
		let { caption: title } = this.controller;
		let divCaption = title ? <b className="text-primary">{title}</b> : <span className="text-info">任务</span>;
		return <div className="px-3 py-2">
			<span className="mr-2">{divCaption}</span> {this.renderState()}
		</div>;
	}

	protected renderState(): JSX.Element {
		return <>state</>;
	}
}