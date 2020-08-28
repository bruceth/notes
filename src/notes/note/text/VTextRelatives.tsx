//import React from 'react';
import { VRelatives } from '../../noteBase';
import { CNoteText } from './CNoteText';
import { RelativeKey } from '../../model';

export class VTextRelatives extends VRelatives<CNoteText> {
	protected arr:RelativeKey[] = ['comment', 'to'];

	render() {
		return super.render();
	}
}
