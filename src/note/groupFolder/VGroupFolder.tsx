import React from 'react';
import { VFolder } from "note/folder/VFolder";

export class VGroupFolder extends VFolder {
	protected top():JSX.Element {
		return <div className="p-3">群的顶部内容</div>;
	}
}
