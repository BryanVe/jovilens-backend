import { model, Schema } from 'mongoose'

const collectionName = 'generalTypes'

const GeneralType = new Schema<IGeneralType>(
  {
    groupId: {
      type: String,
    },
    label: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      unique: true,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: collectionName,
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_, ret) {
        delete ret._id
        delete ret.deleted
      },
      virtuals: true,
    },
  }
)

export const GeneralTypeModel = model<IGeneralType>(collectionName, GeneralType)
