import { redirect } from "react-router";
import { getUser } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await getUser();
    if (user) return redirect("/dashboard"); // 已登入 → dashboard
  } catch (e) {
    console.log("No logged in user", e);
  }
  return redirect("/sign-in"); // 未登入 → sign-in
}

const Index = () => null;
export default Index;
