import React from 'react';
import { VFolder } from "../views/VFolder";
import { Muted } from 'tonva';

export class VSpaceView extends VFolder {
	protected top():JSX.Element {
		return <div className="p-3"><Muted>[群说明:无]</Muted></div>;
	}
}
