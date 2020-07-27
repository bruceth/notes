import { Tuid, Query, Action/*, Map, Sheet, Tag*/ } from "tonva";

export enum EnumSpecFolder {notes=1};

export interface Notes {
	Note: Tuid;

	AddNote: Action;
	SetNote: Action;
	SendNoteTo: Action;
	AddContact: Action;
	AssignTask: Action;

	GetNotes: Query;
	GetMyContacts: Query;
	GetNote: Query;
};

export interface UQs {
    notes: Notes
}
