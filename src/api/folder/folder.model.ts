import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { User } from '../user/user.model';

@index({ user: 1, folderName: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Folder {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ required: true })
  folderName: string;
}

const FolderModel = getModelForClass(Folder);
export default FolderModel;
