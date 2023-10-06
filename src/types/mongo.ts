import { type User } from "next-auth";
import { type Document, type ObjectId } from "mongoose";

export interface UserDocument extends User {
  nationalId: string;
  first_name: string;
  last_name: string;
  organizations: UserOrganizationSchema[];
}

export interface UserOrganizationSchema {
  org_id: ObjectId;
  org_name: string;
  picture: string;
  password: string;
  email: string;
  emailConfirmed: Date;
  jobTitle: string;
  roles: ObjectId[];
}

export interface PermissionDocument {
  _id: ObjectId;
  name: string;
}

export interface ReportDocument {
  author: string;
  notes: string;
}

export interface PatientAddress {
  _id: ObjectId;
  district: string;
  street_name: string;
  city: string;
  postal_code?: string;
}

export interface PatientFullName {
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface PatientRelativePhoneNumbers {
  _id: ObjectId;
  phone_number: string;
  relative: string;
}

export interface PatientDocument {
  profile: {
    gender: string;
    date_of_birth: Date;
    nationalId: string;
    full_name: PatientFullName;
    address: PatientAddress[];
    imageUrl?: string;
    phone_number: string;
    relative_phone_numbers: PatientRelativePhoneNumbers[];
  };
  health_record: {
    collection_name: string;
    data: object[] | string[];
  }[];
}

export type UserRole = {
  _id: ObjectId;
  name: string;
  permissions: string[];
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
  display_name_ar: string;
  display_name_en: string;
  is_public: boolean;
  is_patient_profile: boolean;
  is_patient_specific: boolean;
  description: string;
}

export interface CollectionTemplateDocument {
  schema: string;
  collection_name: string;
  primary: boolean;
  is_printable: boolean;
  is_patient_specific: boolean;
  name: string;
}
