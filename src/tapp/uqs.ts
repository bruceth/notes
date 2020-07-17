import { Tuid, Map, Query, Action, Sheet, Tag } from "tonva";

export enum EnumSpecFolder {notes=1};

export interface Notes {
	Note: Tuid;

	AddNote: Action;
	SetNote: Action;
	SendNoteTo: Action;

	GetNotes: Query;
	GetMyContacts: Query;
};

export interface UQs {
    notes: Notes
}
