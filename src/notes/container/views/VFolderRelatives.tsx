//import React from 'react';
import { CContainer } from "../CContainer";
import { VRelatives } from '../../noteBase/VRelatives';
import { RelativeKey } from "../../model";

export class VFolderRelatives extends VRelatives<CContainer> {
	protected arr:RelativeKey[] = ['to'];

	render() {
		return super.render();
	}
}
