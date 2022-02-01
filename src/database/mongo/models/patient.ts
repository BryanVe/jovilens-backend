import { model, Schema } from 'mongoose'

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
      required: true,
    },
    gender: {
      type: String,
      required: true,
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
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_, ret) {
        delete ret._id
        delete ret.__v
        delete ret.deleted
      },
      virtuals: true,
    },
  }
)

const PatientModel = model<IPatient>('patient', Patient)

export { PatientModel }
