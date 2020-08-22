import { EnumNoteItemType } from "note/model";

export enum EnumTaskState { Start = 0, Done = 1, Pass = 2, Fail = 3, Rated = 4, Canceled = 5 };

export function GetTaskStateContent(type:number, state:number) {
	if (type != Number(EnumNoteItemType.task))
		return;
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
}

