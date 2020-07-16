import { Tuid, Map, Query, Action, Sheet, Tag } from "tonva";

export enum EnumSpecFolder {notes=1};

export interface Notes {
	RNote: Tuid;
	Anchor: Tuid;
	Note: Tuid;

	AddRNote: Action;
	SetRNote: Action;

	GetNotes: Query;
};

export interface UQs {
    notes: Notes
}
