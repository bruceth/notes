//import React from 'react';
import { VRelativesBase, TabRelative } from "notes/note/views";
import { CFolder } from "../CFolder";

export class VFolderRelatives extends VRelativesBase<CFolder> {
	protected get tabs():TabRelative[] { return [this.tabShare] };
}
