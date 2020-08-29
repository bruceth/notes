import { CNotes } from '../CNotes';
import { CNoteTask } from './task';
import { CNoteText } from './text';
import { CNoteAssign } from './assign'

export function createCNoteTask(cNotes: CNotes): CNoteTask {
	return new CNoteTask(cNotes);
}

export function createCNoteText(cNotes: CNotes): CNoteText {
	return new CNoteText(cNotes);
}

export function createCNoteAssign(cNotes: CNotes): CNoteAssign {
	return new CNoteAssign(cNotes);
}
