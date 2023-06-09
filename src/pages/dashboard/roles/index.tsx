import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { CiCirclePlus } from "react-icons/ci";
import { api } from "@/utils/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineLoading } from "react-icons/ai";
import { Formik, Form, Field } from "formik";
import { roleFormSchema } from "@/validation/role";
import CheckboxInput from "@/components/form/sub/CheckBoxInput";
import TextInput from "@/components/form/sub/TextInput";
import { BiSave } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

// mo2ktan 3yza tt3dl aktar bkter
const PermissionsGenerator = ({
  permission,
  inputBinding,
  label,
}: {
  label: string;
  permission: string;
  inputBinding: string;
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col gap-2 capitalize">
        <h3 className="text-3xl font-semibold">{label}</h3>
        <div className="flex items-center py-5">
          <CheckboxInput
            name={inputBinding}
            value={`${permission}:create`}
            label="create"
          />
          <CheckboxInput
            name={inputBinding}
            value={`${permission}:read`}
            label="read"
          />
          <CheckboxInput
            name={inputBinding}
            value={`${permission}:update`}
            label="update"
          />
          <CheckboxInput
            name={inputBinding}
            value={`${permission}:delete`}
            label="delete"
          />
        </div>
      </div>
    </div>
  );
};

const IndexPage: serverSidePropsType = ({ user }) => {
  const { data, isLoading, refetch } = api.organization.listRoles.useQuery({
    org_name: user.orgName,
  });
  const { mutate: addRole, isLoading: isAddingRole } =
    api.organization.addRole.useMutation({ onSuccess: () => refetch() });

  const { mutate: updateRole, isLoading: isUpdatingRole } =
    api.organization.updateRole.useMutation({ onSuccess: () => refetch() });

  const { mutate: deleteRole, isLoading: isDeletingRole } =
    api.organization.deleteRole.useMutation({ onSuccess: () => refetch() });

  const [initValue, setInitValue] = useState(data?.roles[0]);
  return (
    <DashBoardLayout user={user} title="" description="">
      <main className="relative h-full">
        <section className="relative grid h-full grid-cols-[300px_1fr] text-primary">
          {data && (
            <>
              <aside className="flex flex-col gap-3 border-r-[1px] border-gray-500 p-4 ">
                <header className="flex justify-between">
                  <h2 className="text-lg font-semibold">my roles</h2>
                  <button
                    onClick={() =>
                      addRole({
                        org_name: user.orgName,
                        role_name: nanoid(),
                      })
                    }
                  >
                    {isAddingRole ? (
                      <AiOutlineLoading className="animate-spin" />
                    ) : (
                      <CiCirclePlus size={25} />
                    )}
                  </button>
                </header>
                <ul className="flex flex-col gap-2 text-white">
                  {data.roles.map((role) => (
                    <li
                      key={nanoid()}
                      className={`flex rounded-md bg-primary transition hover:bg-primary-hover ${
                        initValue?.name === role.name && "bg-primary-hover"
                      } shadow-sm`}
                    >
                      <button
                        onClick={() => setInitValue(role)}
                        className="w-full p-2"
                      >
                        {role.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
              <section className="pb-15 flex flex-col bg-white">
                <div className=" text-primary">
                  {initValue && (
                    <Formik
                      initialValues={initValue}
                      onSubmit={(values) => {
                        updateRole({
                          orgName: user.orgName,
                          name: initValue.name,
                          data: values,
                        });
                      }}
                      validationSchema={roleFormSchema}
                      enableReinitialize
                    >
                      {({ errors }) => (
                        <Form>
                          <div className="p-5 text-2xl">
                            <h2 className="flex justify-between text-4xl font-semibold">
                              Role Name
                              <div className="flex gap-3">
                                <button type="submit">
                                  <BiSave />
                                </button>
                                <button
                                  onClick={() => {
                                    deleteRole({
                                      orgName: user.orgName,
                                      name: initValue.name,
                                    });
                                    setInitValue(null);
                                  }}
                                >
                                  <RiDeleteBin7Line />
                                </button>
                              </div>
                            </h2>
                            <TextInput name="name" />
                          </div>
                          {/* permission that only could be given comes from db */}
                          <div className="flex h-[80vh] flex-col gap-3 overflow-y-auto border-t-2 border-black p-5">
                            <h2 className="text-4xl font-semibold">
                              Permissions
                            </h2>
                            <div className="flex flex-col gap-3 ">
                              <div className="flex flex-col gap-6">
                                <PermissionsGenerator
                                  label="users"
                                  permission="users"
                                  inputBinding="permissions"
                                />
                                <PermissionsGenerator
                                  label="patient's  profile"
                                  permission="patients.profile"
                                  inputBinding="permissions"
                                />
                                <PermissionsGenerator
                                  label="patient's record"
                                  permission="patients.record"
                                  inputBinding="permissions"
                                />
                                <PermissionsGenerator
                                  label="collections"
                                  permission="collections"
                                  inputBinding="permissions"
                                />
                                <PermissionsGenerator
                                  label="roles"
                                  permission="roles"
                                  inputBinding="permissions"
                                />
                                <PermissionsGenerator
                                  label="organizations"
                                  permission="organizations"
                                  inputBinding="permissions"
                                />
                              </div>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </section>
            </>
          )}
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

  // const {
  //   user: { nationalId, orgName, orgId },
  // } = session;
  // STEP 1 CHECK IF HE STILL WORK THERE

  // STEP 2 CHECK IF HE HAS THE PERMISSIONS TO ACCESS THAT PAGE
  // const doc = await UserModel.findOne(
  //   {
  //     nationalId,
  //     "organizations.org_name": orgName,
  //     "organizations.org_id": orgId,
  //   },
  //   { "organizations.$": true }
  // );
  // does doc.organizations[0].roles contains the ability to make roles ?
  return {
    props: {
      user: session.user,
    },
  };
}
