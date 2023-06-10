import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { CiCirclePlus } from "react-icons/ci";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineLoading } from "react-icons/ai";
import { Formik, Form, Field } from "formik";
import { roleFormSchema } from "@/validation/role";
import CheckboxInput from "@/components/form/sub/CheckBoxInput";
import TextInput from "@/components/form/sub/TextInput";
import { CiFloppyDisk, CiTrash } from "react-icons/ci";
import { routes } from "@/routes";
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
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 capitalize">
        <h3 className="text-xl font-semibold">{label}</h3>
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

const IndexPage: serverSidePropsType = ({ user, links }) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useEffect(() => {
    if (initValue) return;
    setInitValue(data?.roles[0]);
  }, [data]);

  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative h-full">
        <section className="relative grid h-full grid-cols-[250px_1fr] text-primary">
          {data && (
            <>
              <aside className="flex flex-col gap-3 border-r-[1px] border-slate-200 p-4">
                <header className="flex justify-between">
                  <h2 className="text-lg font-semibold">Roles</h2>
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
                <ul className="flex flex-col gap-2">
                  {data.roles.map((role) => (
                    <li
                      key={nanoid()}
                      className={`flex rounded-md border-2 transition hover:bg-slate-200 ${
                        initValue?.name === role.name && "bg-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => setInitValue(role)}
                        className="w-full p-2 text-left"
                      >
                        {role.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
              <section className="pb-15 flex flex-col">
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
                          <div className="p-5">
                            <div className="flex justify-between">
                              <h2 className="text-2xl font-semibold">
                                Role Name
                              </h2>
                              <div className="flex gap-3">
                                <button
                                  type="submit"
                                  className="flex items-center gap-2 rounded-md border-[1px] border-primary bg-primary p-1 px-3 text-sm text-white transition hover:bg-primary-hover"
                                >
                                  <CiFloppyDisk />
                                  <span>Save Role</span>
                                </button>
                                <button
                                  className="flex items-center gap-2 rounded-md border-[1px] border-red-500 p-1 px-3 text-sm text-red-500 transition"
                                  onClick={() => {
                                    deleteRole({
                                      orgName: user.orgName,
                                      name: initValue.name,
                                    });
                                    setInitValue(null);
                                  }}
                                >
                                  <CiTrash />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                            <TextInput name="name" />
                          </div>
                          {/* permission that only could be given comes from db */}
                          <div className="flex w-full flex-col gap-3 border-t-[1px] border-slate-200 p-5">
                            <h2 className="text-2xl font-semibold">
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
      links: routes.dashboardPages,
    },
  };
}
