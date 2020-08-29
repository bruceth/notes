//import React from 'react';
import { VRelatives } from '../../noteBase';
import { CNoteAssign } from './CNoteAssign';
import { RelativeKey } from '../../model';

export class VAssignRelatives extends VRelatives<CNoteAssign> {
	protected arr:RelativeKey[] = ['comment', 'to', 'spawn'];

	render() {
		return super.render();
	}
}
