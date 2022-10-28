import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { Folder } from '../folder/folder.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Note {
  @prop({ ref: () => Folder })
  folder: Ref<Folder>;

  @prop({ required: true })
  noteTitle: string;

  @prop({ required: true })
  noteContent: string;
}

const NoteModel = getModelForClass(Note);
export default NoteModel;
