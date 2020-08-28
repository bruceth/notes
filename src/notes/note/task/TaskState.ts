import { EnumNoteType } from "../../model";

export enum EnumTaskState { Start = 0, Done = 1, Pass = 2, Fail = 3, Rated = 4, Canceled = 5 };

export interface TaskStateResult {
	content: string;
	isEnd: boolean;
}
const stateContents: {[key in EnumTaskState]: TaskStateResult} = {
	[EnumTaskState.Start]: {content: '待办', isEnd: false},
	[EnumTaskState.Done]: {content: '已办', isEnd: true},
	[EnumTaskState.Pass]: {content: '签收', isEnd: true},
	[EnumTaskState.Fail]: {content: '拒签', isEnd: true},
	[EnumTaskState.Rated]: {content: '已评价', isEnd: true},
	[EnumTaskState.Canceled]: {content: '已取消', isEnd: true}
}

export function GetTaskStateContent(type:number, state:number) {
	if (type !== Number(EnumNoteType.task))
		return;
	return stateContents[state as EnumTaskState];
	/*
	let content:string;
	let isEnd:boolean = true;
	// eslint-disable-next-line
	if (state == Number(EnumTaskState.Start)) {
		content = '待办';
		isEnd = false;
	}
	// eslint-disable-next-line
	else if (state == Number(EnumTaskState.Done)) {
		content = '已办';
	}
	// eslint-disable-next-line
	else if (state == Number(EnumTaskState.Pass)) {
		content = '已验收';
	}
	// eslint-disable-next-line
	else if (state == Number(EnumTaskState.Fail)) {
		content = '拒签';
	}
	// eslint-disable-next-line
	else if (state == Number(EnumTaskState.Rated)) {
		content = '已评价';
	}
	// eslint-disable-next-line
	else if (state == Number(EnumTaskState.Fail)) {
		content = '已取消';
	}
	else {
		return;
	}

	return {content, isEnd};
	*/
}
