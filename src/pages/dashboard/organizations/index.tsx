import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import DashBoardLayout from "@/layouts/DashboardLayout";
import {routes} from "@/routes";
import {OrganizationModel, UserModel} from "@/server/models";
import {dbConnect} from "@/server/db";

type serverSidePropsType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const IndexPage: serverSidePropsType = ({ user, links }) => {
  return (
    <DashBoardLayout links={links} user={user} title="" description="">
      <main className="relative ">
        <section className="flex gap-2 bg-slate-50 px-5 py-3 text-black">
          Hello org
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


  // get roles
  // if has * just don't go further
  // if has not * get all permissions associated to every role the user has
  //
  await dbConnect()

  const doc = await UserModel.findOne(
      {nationalId : session.user.nationalId , 'organizations.org_name' : session.user.orgName , 'organizations.org_id' : session.user.orgId},
      {'organizations.roles.$' : true , _id : false}
  )
  const userRoles = doc.organizations[0];
  if(!userRoles.roles){
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const pages = routes.dashboardPages
  const entityToAccess = 'patients'

  const re = new RegExp(`^${entityToAccess}`);

  const organizationSpecificRolePermissions = await OrganizationModel.aggregate([
      { $match : { name : session.user.orgName }},
      { $project : {_id : false , name : false , updatedAt : false}},
      { $unwind : "$roles"},
      { $match : {'roles.name' : {$in : ['nurse' , 'doctor']} }},
      { $unwind :'$roles.permissions'},
    {
      $match: {
        'roles.permissions': {
          $regex: /^(patients|collections|organizations|users|roles|settings)/
        }
      }
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^patients/ } },
                then: "patients"
              },
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^collections/ } },
                then: "collections"
              },
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^organizations/ } },
                then: "organizations"
              },
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^users/ } },
                then: "users"
              },
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^roles/ } },
                then: "roles"
              },
              {
                case: { $regexMatch: { input: "$roles.permissions", regex: /^settings/ } },
                then: "settings"
              }
            ]
          }
        },
    permissions: {
          $push: "$roles.permissions"
        }
      }
    },

  ])
organizationSpecificRolePermissions.forEach(e => {
  console.log("--------------")
  console.log(e)
  console.log("--------------")
})

  // check if the users has any permissions related to the page that he wants to visit
  // if no redirect
  // if yes
  // remove from links any thing that is not in the array
  // send the updated links + page specific permissions


  return {
    props: {
      user: session.user,
      links : pages
    },
  };
}
