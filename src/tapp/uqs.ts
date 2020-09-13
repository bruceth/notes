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
	SetGroup: Action;

	$Poked: Query;
	GetNotes: Query;
	GetMyContacts: Query;
	GetNote: Query;
	GetShareContacts: Query;
	GetSpawnContacts: Query;

	AddGroupMember: Action;
	RemoveGroupMember: Action;
	GetGroupFolderMemberCount: Query;
	GetGroupMembers: Query;
	GetGroupContacts: Query;

	GetBookProjects: Query;
	GetProjectFlow: Query;
	GetProjectYearSum: Query;
	GetProjectMonthSum: Query;
	GetProjectDaySum: Query;

	InitMySetting: Action;
};

export interface UQs {
    notes: Notes
}
