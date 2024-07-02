import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex h-full justify-center items-center flex-col bg-sky-400" >
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white text-lg">Simple Auth Service</p>
        <div>
          <LoginButton>

            <Button size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
