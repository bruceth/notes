import { CNotes } from '../../CNotes';
import { NoteItem } from '../../model';
import { CNoteTask } from './CNoteTask';
import { EnumTaskState } from './TaskState';
import { CTaskStart } from './start';
import { CTaskDone } from './done';
import { CTaskCanceled } from './canceled';
import { CTaskPass } from './pass';
import { CTaskFail } from './fail';
import { CTaskRated } from './rated';

export function createCNoteTask(cNotes: CNotes, noteItem: NoteItem): CNoteTask {
	switch (noteItem.state as EnumTaskState) {
		default:
		case EnumTaskState.Start:
			return new CTaskStart(cNotes);
		case EnumTaskState.Done:
			return new CTaskDone(cNotes);
		case EnumTaskState.Pass:
			return new CTaskPass(cNotes);
		case EnumTaskState.Fail:
			return new CTaskFail(cNotes);
		case EnumTaskState.Rated:
			return new CTaskRated(cNotes);
		case EnumTaskState.Canceled:
			return new CTaskCanceled(cNotes);
	}
}
