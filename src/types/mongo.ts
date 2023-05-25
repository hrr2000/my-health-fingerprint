import { type User } from "next-auth";
import { type Document, type ObjectId } from "mongoose";

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
  profile: {
    gender: string;
    date_of_birth: Date;
    nationalId: string;
    name: string;
    address: string;
    imageUrl: string;
    primary_phone_number: string;
    alternative_phone_numbers: string[];
  };
  health_record: {
    collection_name: string;
    data: object | string[];
  }[];
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
  _id: ObjectId;
  name: string;
  is_public: boolean;
  is_patient_profile: boolean;
  description: string;
}

export interface CollectionTemplateDocument {
  schema: string;
  collection_id: string;
  primary: boolean;
  is_printable: boolean;
  name: string;
}
