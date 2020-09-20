import { CNotes } from "notes/CNotes";
import { CUniteNote } from "./CUnitNote";

export function createCUnitNote(cNotes: CNotes): CUniteNote { 
	return new CUniteNote(cNotes);
}
