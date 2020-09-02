//import React from 'react';
import { VRelativesBase } from '../views';
import { CNoteAssign } from './CNoteAssign';
import { TabRelative } from '../views';

export class VAssignRelatives extends VRelativesBase<CNoteAssign> {
	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare] };
}
