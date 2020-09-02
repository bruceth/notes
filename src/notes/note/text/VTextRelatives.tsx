//import React from 'react';
import { VRelativesNoteBase, TabRelative } from '../views';
import { CNoteText } from './CNoteText';

export class VTextRelatives extends VRelativesNoteBase<CNoteText> {
	protected get tabs():TabRelative[] { return [this.tabComment, this.tabShare] };
}
