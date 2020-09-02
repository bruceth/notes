import { CNoteTask } from "./CNoteTask";
import { VRelativesBase, TabRelative } from '../views';

export class VTaskRelatives extends VRelativesBase<CNoteTask> {
	protected get tabs():TabRelative[] { return [this.tabComment] };
}
