import { CNoteTask } from "./CNoteTask";
import { VRelativesNoteBase, TabRelative } from '../views';

export class VTaskRelatives extends VRelativesNoteBase<CNoteTask> {
	protected get tabs():TabRelative[] { return [this.tabComment] };
}
