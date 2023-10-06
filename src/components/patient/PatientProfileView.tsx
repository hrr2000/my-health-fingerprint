import { usePatientContext } from "@/contexts/PatientContext";
import useGetPatientProfileData from "@/hooks/useGetPatientProfileData";
import React, { useState } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Form, Formik } from "formik";
import { patientProfileFormSchema } from "@/validation/patient";
import TextInput from "../form/sub/TextInput";
import { DatePickerField } from "../form/sub/DatePickerInput";
import { CiCirclePlus, CiCircleInfo } from "react-icons/ci";
import { nanoid } from "nanoid";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

export const PatientProfileView = () => {
  const { patientId } = usePatientContext();
  const {
    data: profile,
    error,
    fetchStatus,
    refetch,
  } = useGetPatientProfileData(patientId || "");
  const {
    mutate: updatePatientProfile,
    isLoading: isUpdatingProfile,
    isSuccess: isUpdateProfileSuccess,
  } = api.patient.updateProfile.useMutation({ onSuccess: () => refetch() });
  const [initValues, setInitValues] = useState({
    ...profile,
    dateOfBirth:
      typeof profile?.dateOfBirth !== "string"
        ? profile?.dateOfBirth.toISOString().split("T")[0]
        : profile?.dateOfBirth,
  });

  const {t} = useTranslation()

  return (
    <main className={"relative flex-1"}>
      {initValues ? (
        <div className="p-2">
          <Formik
            initialValues={initValues}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={patientProfileFormSchema}
            onSubmit={(values) => {
              updatePatientProfile({
                profileData: {
                  ...values,
                  dateOfBirth: new Date(values.dateOfBirth || ""),
                },
                nationalId: patientId || "",
              });
            }}
            enableReinitialize
          >
            {({ errors, values }) => (
              <Form className="flex flex-col gap-5 overflow-y-auto p-5 scrollbar-track-blue-300  scrollbar-thumb-gray-50">
                <div className="flex justify-end">
                  <button
                    disabled={isUpdatingProfile}
                    className="w-max  rounded-md bg-primary px-5 py-2 text-lg text-white shadow-md transition disabled:grayscale hover:bg-primary-hover"
                    type="submit"
                  >
                    <span>{t("Save Profile")}</span>
                  </button>
                </div>
                <section className=" rounded-md border-2 border-slate-100 bg-white p-5 shadow-sm ">
                  <h2 className="mb-2 text-2xl font-bold">{t("Patient Name")}</h2>
                  <div className="flex gap-2 text-lg">
                    <TextInput
                      name="fullName.firstName"
                      label={t("first name")}
                      required
                    />
                    <TextInput name="fullName.middleName" label={t("middle name")} />
                    <TextInput
                      name="fullName.lastName"
                      label={t("last name")}
                      required
                    />
                  </div>
                </section>
                <section className="flex flex-col gap-2 rounded-md border-2 border-slate-100 bg-white p-5">
                  <div className="flex items-center justify-between ">
                    <div className="flex gap-2">
                      <h2 className="mb-2 text-2xl font-bold">{t("Addresses")}</h2>
                      <button
                        type="button"
                        className="mb-1 rounded-full capitalize text-primary transition hover:scale-110"
                        onClick={() =>
                          setInitValues({
                            ...values,
                            address: [
                              ...values.address,
                              {
                                id: nanoid(),
                                city: "",
                                district: "",
                                streetName: "",
                              },
                            ],
                          })
                        }
                      >
                        <span>
                          <CiCirclePlus size={30} />
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-1 rounded-md p-1 text-sm text-highlight shadow-sm">
                      <CiCircleInfo size={15} />
                      <span>{t("You must have at least one address")}</span>
                    </div>
                  </div>

                  {initValues.address.map((add, index) => (
                    <div
                      key={add.id.toString()}
                      className="flex flex-col gap-2 rounded-md  border-2 border-slate-100 p-3 shadow-sm"
                    >
                      <div className="flex items-end gap-2">
                        <TextInput
                          name={`address[${index}].city`}
                          label={t("city")}
                          required
                        />
                        <TextInput
                          name={`address[${index}].district`}
                          label={t("district")}
                          required
                        />
                      </div>
                      <TextInput
                        name={`address[${index}].streetName`}
                        label={t("street name")}
                        required
                      />
                    </div>
                  ))}
                </section>
                <section className=" flex gap-2 rounded-md border-2 border-slate-100 bg-white p-5">
                  <DatePickerField
                    name="dateOfBirth"
                    label={t("date of birth")}
                    required
                  />
                  <TextInput name="gender" label={t("gender")} required />
                  <TextInput name="phoneNumber" label={t("phone number")} required />
                </section>
                <section className="flex flex-col gap-2 rounded-md border-2 border-slate-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <h2 className="mb-2 text-2xl font-bold">{t("Relatives")}</h2>
                      <button
                        type="button"
                        onClick={() =>
                          setInitValues({
                            ...values,
                            relativePhoneNumbers: [
                              ...values.relativePhoneNumbers,
                              {
                                id: nanoid(),
                                phoneNumber: "",
                                relative: "",
                              },
                            ],
                          })
                        }
                        className="mb-1 rounded-full capitalize text-primary transition hover:scale-110"
                      >
                        <span>
                          <CiCirclePlus size={30} />
                        </span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 rounded-md p-1 text-sm text-highlight shadow-sm">
                        <CiCircleInfo size={15} />
                        <span>
                          {t("You must have at least two registered phone numbers")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {initValues.relativePhoneNumbers.map((phoneNumber, index) => (
                    <div
                      key={phoneNumber.id.toString()}
                      className="flex flex-col gap-2 rounded-md border-2 border-slate-100 p-3 shadow-sm"
                    >
                      <div className="flex gap-2">
                        <TextInput
                          name={`relativePhoneNumbers[${index}].phoneNumber`}
                          label={t("phone number")}
                          required
                        />
                        <TextInput
                          name={`relativePhoneNumbers[${index}].relative`}
                          label={t("relationship")}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </section>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};
