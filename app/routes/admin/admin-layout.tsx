import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "components";
import { account } from "~/appwrite/client";
import { getExistingUser } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const sessionUser = await account.get();
    if (!sessionUser?.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(sessionUser.$id);
    if (!existingUser) return redirect("/sign-in");

    return existingUser; // admin/user 都返回
  } catch (e) {
    console.error("Error in AdminLayout loader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width="270px" enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
