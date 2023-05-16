import {User} from "next-auth";
import {Document, ObjectId} from "mongoose";

export interface UserDocument extends User {
  nationalId: string;
  first_name: string;
  last_name: string;
  organizations: {
    org_id: ObjectId;
    org_name: string;
    picture: string;
    password: string;
    email: string;
    emailConfirmed: Date;
    jobTitle: string;
    roles: ObjectId[];
  }[];
}

export interface PermissionDocument {
  _id: ObjectId;
  name: string;
}


export interface ReportDocument {
  author: string;
  notes: string;
}

export interface PatientDocument {
  name: string;
  nationalId: string;
  reports: ReportDocument[];
  history?: object;
}

export type UserRole = {
  _id: ObjectId;
  slug: string;
  permissions: ObjectId[];
};

export interface OrganizationDocument {
  _id: ObjectId;
  name: string;
  roles: UserRole[];
}

export interface AllowedPermissionDocument extends Document {
  _id: ObjectId;
  entity_name: string;
  permissions: ObjectId[];
}

export interface CustomCollectionDocument {
  _id: ObjectId,
  name: string;
  is_public: boolean;
  patient_profile: boolean;
}

export interface CollectionTemplateDocument {
  schema: string,
  org_id: ObjectId,
  collection: string;
  primary: boolean;
}

