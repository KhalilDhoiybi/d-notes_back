import mongoose from 'mongoose';

// IsValid Id func
const IsValid = (id: string) => {
  try {
    const objId = new mongoose.Types.ObjectId(id).toString();
    return objId === id;
  } catch (e) {
    return false;
  }
};

export default IsValid;
