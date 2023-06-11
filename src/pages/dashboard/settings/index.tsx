import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession, getServerAuthZSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import { api } from "@/utils/api";

import { useEffect, useState } from "react";
import CheckboxInput from "@/components/form/sub/CheckBoxInput";
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
          halo settings
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

  return await getServerAuthZSession(session, "settings");
}
