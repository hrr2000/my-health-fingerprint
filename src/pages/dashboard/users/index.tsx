import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession, getServerAuthZSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { CiCirclePlus } from "react-icons/ci";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextInput from "@/components/form/sub/TextInput";
import GenericButton from "@/components/common/GenericButton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { numeric } from "@/validation/utils";
import { createUserFormSchema } from "@/validation/user";
import CheckboxInput from "@/components/form/sub/CheckBoxInput";
import Image from "next/image";
import { routes } from "@/routes";
import { toast } from "react-toastify";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const IndexPage: serverSidePropsType = ({ user, links }) => {
  const notifySuccess = (msg: string) => toast(msg, { type: "success" });
  const {
    data: rolesData,
    isLoading: isRolesLoading,
    refetch: refetchRoles,
  } = api.organization.listRoles.useQuery({
    org_name: user.orgName,
  });
  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = api.organization.listUsers.useQuery();
  const { mutate: createUser, isLoading: isCreatingUser } =
    api.user.createOne.useMutation({
      onSuccess: async () => {
        notifySuccess("User was created successfully!");
        await refetchUsers();
      },
    });

  const { mutate: updateUser, isLoading: isUpdatingUser } =
    api.user.updateOne.useMutation({
      onSuccess: async () => {
        notifySuccess("User was updated successfully!");
        await refetchUsers();
      },
    });

  const [nationalId, setNationalId] = useState("");
  const [mutationState, setMutationState] = useState<
    "idle" | "create" | "update"
  >("idle");
  const [userToUpdate, setUserToUpdate] = useState({
    nationalId: "",
    first_name: "",
    last_name: "",
    organization: {
      password: "",
      email: "",
      jobTitle: "",
      roles: [],
    },
  });

  const {
    data: currentUser,
    remove,
    error: currentUserError,
    isFetching: isCurrentUserLoading,
  } = api.user.findOne.useQuery(
    {
      nationalId,
    },
    {
      enabled: nationalId.length == 14,
      retry: 0,
    }
  );

  useEffect(() => {
    if (mutationState === "idle") {
      setNationalId(0);
    }
  }, [mutationState]);

  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative h-full">
        <section className="relative grid h-full grid-cols-[250px_1fr] text-primary">
          <>
            <aside className="flex flex-col gap-3 border-r-[1px] border-slate-200 p-4">
              <header className="flex justify-between">
                <h2 className="text-lg font-semibold">Users</h2>
                <button
                  onClick={() => {
                    setMutationState("idle");
                  }}
                >
                  <CiCirclePlus size={25} />
                </button>
              </header>
              <div>
                <input
                  type="text"
                  placeholder="search..."
                  className="my-3 w-full border-slate-300 bg-slate-100 text-sm"
                />
                {usersData?.users
                  ?.map((item) => {
                    return {
                      ...item,
                      organization: item.organizations.filter(
                        (org) =>
                          org?.org_id?.toString() === user?.orgId?.toString()
                      )?.[0],
                    };
                  })
                  ?.map((item) => {
                    return (
                      <button
                        key={`user-${item._id.toString()}`}
                        className="relative flex w-full items-center overflow-hidden rounded-md p-2 text-lg hover:bg-gray-300/25"
                        onClick={() => {
                          setMutationState("update");
                          setUserToUpdate(item);
                        }}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 bg-[#dddddd] p-1.5 shadow-lg">
                          <Image
                            src={item?.organization?.picture}
                            width={40}
                            height={40}
                            alt=""
                            className="shrink-0 rounded-[50%]"
                          />
                        </span>
                        <div className="flex flex-col items-start justify-center">
                          <span className="mx-4 whitespace-nowrap text-sm font-bold capitalize">
                            {item.first_name + " " + item.last_name}
                          </span>
                          <span className="mx-4 whitespace-nowrap text-sm capitalize">
                            {item?.organization?.jobTitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </aside>
            <section className="pb-15 relative flex flex-col p-10">
              <div className=" text-primary">
                {mutationState === "idle" && (
                  <div>
                    <Formik
                      initialValues={{
                        national_id: "",
                      }}
                      validationSchema={toFormikValidationSchema(
                        z.object({ national_id: numeric().min(14).max(14) })
                      )}
                      onSubmit={(values) => {
                        setNationalId(values.national_id);
                      }}
                    >
                      <Form>
                        <TextInput
                          name={"national_id"}
                          label={"National Id"}
                          placeholder={"National Id"}
                          type={"text"}
                          required
                        />
                        <div className={"my-3"}>
                          <GenericButton theme={"primary"} text={"Next"} />
                          {isCurrentUserLoading && <LoadingSpinner />}
                        </div>
                      </Form>
                    </Formik>
                    {currentUser && (
                      <div>
                        {!currentUser.organizations.filter(
                          (org) =>
                            org.org_id.toString() === user.orgId.toString()
                        ).length ? (
                          <>
                            <span>
                              {
                                "The user is found but isn't registered for this"
                              }
                              organization.
                            </span>
                            <button
                              className={"mx-1 text-highlight hover:underline"}
                            >
                              invite the user!
                            </button>
                          </>
                        ) : (
                          <>
                            <span>The user is already exist!</span>
                          </>
                        )}
                      </div>
                    )}
                    {currentUserError && (
                      <div>
                        <span className={"text-red-500"}>
                          {"This user isn't found."}
                        </span>
                        <button
                          onClick={() => {
                            setMutationState("create");
                          }}
                          className={"mx-1 text-highlight hover:underline"}
                        >
                          create this user!
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {mutationState !== "idle" && (
                  <Formik
                    initialValues={
                      mutationState === "update"
                        ? {
                            nationalId: userToUpdate?.nationalId,
                            firstName: userToUpdate?.first_name,
                            lastName: userToUpdate?.last_name,
                            password: userToUpdate?.organization?.password,
                            email: userToUpdate?.organization?.email,
                            jobTitle: userToUpdate?.organization?.jobTitle,
                            orgId: user.orgId,
                            orgName: user.orgName,
                            roles: userToUpdate?.organization?.roles,
                          }
                        : {
                            nationalId,
                            firstName: "",
                            lastName: "",
                            password: "",
                            email: "",
                            jobTitle: "",
                            orgId: user.orgId,
                            orgName: user.orgName,
                            roles: [],
                          }
                    }
                    enableReinitialize
                    validationSchema={createUserFormSchema}
                    onSubmit={(values) => {
                      if (mutationState === "create") {
                        createUser({
                          ...values,
                        });
                      }
                      if (mutationState === "update") {
                        updateUser({
                          ...values,
                        });
                      }
                    }}
                  >
                    <Form>
                      {
                        <div className={`flex flex-col gap-3`}>
                          <TextInput
                            name={"nationalId"}
                            label={"National Id"}
                            placeholder={"National Id"}
                            type={"text"}
                            required
                          />
                          <div className={"flex gap-4"}>
                            <TextInput
                              name={"firstName"}
                              label={"First Name"}
                              placeholder={"First Name"}
                              type={"text"}
                              required
                            />
                            <TextInput
                              name={"lastName"}
                              label={"Last Name"}
                              placeholder={"Last Name"}
                              type={"text"}
                              required
                            />
                          </div>
                          <TextInput
                            name={"email"}
                            label={"Email"}
                            placeholder={"Email"}
                            type={"email"}
                            required
                          />
                          <TextInput
                            name={"password"}
                            label={"Password"}
                            placeholder={"Password"}
                            type={"password"}
                            required
                          />
                          <TextInput
                            name={"jobTitle"}
                            label={"Job Title"}
                            placeholder={"Job Title"}
                            type={"text"}
                            required
                          />
                          <div className={"my-3 flex flex-col gap-2"}>
                            <label htmlFor={"roles"}>Roles</label>
                            <div
                              className={"flex flex-col justify-between gap-4"}
                            >
                              {rolesData?.roles?.map((role) => {
                                return (
                                  <CheckboxInput
                                    key={role.name}
                                    name={"roles"}
                                    value={`${role._id.toString()}`}
                                    label={role.name}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className={"my-3"}>
                            <GenericButton
                              theme={"primary"}
                              text={
                                mutationState == "update"
                                  ? "Update"
                                  : "Register"
                              }
                            />
                            {(isCurrentUserLoading ||
                              isUpdatingUser ||
                              isCreatingUser) && <LoadingSpinner />}
                          </div>
                        </div>
                      }
                    </Form>
                  </Formik>
                )}
              </div>
            </section>
          </>
        </section>
      </main>
    </DashBoardLayout>
  );
};

export default IndexPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return await getServerAuthZSession(session, "users");
}
