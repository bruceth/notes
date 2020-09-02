//import React from 'react';
import { VRelativesNoteBase } from '../views';
import { CNoteAssign } from './CNoteAssign';
import { TabRelative } from '../views';

export class VAssignRelatives extends VRelativesNoteBase<CNoteAssign> {
	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare] };
}
