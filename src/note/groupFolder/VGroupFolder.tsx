import React from 'react';
import { VFolder } from "note/folder/VFolder";
import { Muted } from 'tonva';

export class VGroupFolder extends VFolder {
	protected top():JSX.Element {
		return <div className="p-3"><Muted>[群说明:无]</Muted></div>;
	}
}
