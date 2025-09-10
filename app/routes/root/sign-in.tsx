import { Link, redirect } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { getUser, loginWithGoogle, storeUserData } from "~/appwrite/auth"; // ✅ 多引入 storeUserData
import { useEffect } from "react";

export async function clientLoader() {
  try {
    const user = await getUser();
    if (user) return redirect("/dashboard");
  } catch (e) {
    console.log("No logged in user", e);
  }
  return null; // 繼續渲染 SignIn 畫面
}

const SignIn = () => {
  // ✅ 在元件掛載時嘗試寫入新使用者資料
  useEffect(() => {
    const initUser = async () => {
      try {
        await storeUserData();
      } catch (error) {
        console.error("Error storing user:", error);
      }
    };
    initUser();
  }, []);

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>

          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
            className="button-class !h-11 !w-full"
            onClick={loginWithGoogle}
          >
            <img
              src="/assets/icons/google.svg"
              className="size-5"
              alt="google"
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
