//import React from 'react';
import { VRelativesBase, TabRelative } from '../views';
import { CNoteText } from './CNoteText';

export class VTextRelatives extends VRelativesBase<CNoteText> {
	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare] };
}
