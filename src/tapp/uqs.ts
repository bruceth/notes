import { Tuid, Query, Action/*, Map, Sheet, Tag*/ } from "tonva";

export enum EnumSpecFolder {notes=1};

export interface Notes {
	Note: Tuid;

	AddNote: Action;
	SetNote: Action;
	SetNoteX: Action;
	SendNoteTo: Action;
	HideNote: Action;
	AddContact: Action;
	SetContactAssinged: Action;
	AssignTask: Action;

	DoneTask: Action;
	CheckTask: Action;
	RateTask: Action;

	AddComment: Action;

	AddGroup: Action;

	$Poked: Query;
	GetNotes: Query;
	GetMyContacts: Query;
	GetNote: Query;
};

export interface UQs {
    notes: Notes
}
