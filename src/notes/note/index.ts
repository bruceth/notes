import { CNotes } from '../CNotes';
import { CNoteTask } from './task';
import { CNoteText } from './text';

export function createCNoteTask(cNotes: CNotes): CNoteTask {
	return new CNoteTask(cNotes);
}

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

