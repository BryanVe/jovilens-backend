import { model, Schema } from 'mongoose'

const collectionName = 'patients'

const Patient = new Schema<IPatient>(
  {
    names: {
      type: String,
      required: true,
    },
    lastNames: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    gender: {
      type: String,
    },
    civilStatus: {
      type: String,
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

const PatientModel = model<IPatient>(collectionName, Patient)

export { PatientModel }
