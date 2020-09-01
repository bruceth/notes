import React from 'react';
import { CNoteBase } from "./CNoteBase";
import { VNoteBaseForm } from './VNoteBaseForm';


export class VNoteBaseEdit<T extends CNoteBase> extends VNoteBaseForm<T> {	
}

export class VNoteBaseEditPage extends VNoteBaseEdit<CNoteBase> {
}
