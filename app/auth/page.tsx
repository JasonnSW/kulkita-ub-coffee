import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";
import { CreateUnitForm } from "@/features/auth/components/create-unit-form";
import { JoinUnitForm } from "@/features/auth/components/join-unit-form";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12">
        <div className="flex flex-col items-center text-center mb-2">
          <div className="relative flex items-center justify-center">
            <Image
              src={logo}
              alt="Kulkita Logo"
              width={68}
              height={68}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            />

            <h1 className="text-7xl font-bold tracking-tight text-gray-800 pl-16">
              ulkita
            </h1>
          </div>

          <p className="text-xl text-[#333] mb-6 font-sourceSansPro">
            Segar Terkelola, Gizi Tersalur
          </p>
          <p className="max-w-md text-gray-500">
            Stock Management pertama di Indonesia
          </p>
        </div>

        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <Tabs defaultValue="create-unit">
                  {/* <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="create-unit">Buat Unit</TabsTrigger>
                    <TabsTrigger value="join-unit">Gabung Unit</TabsTrigger>
                  </TabsList> */}
                  <RegisterForm />
                  {/* <TabsContent value="create-unit">
                    <RegisterForm />
                    <CreateUnitForm />
                  </TabsContent>
                  <TabsContent value="join-unit">
                    <RegisterForm />
                    <JoinUnitForm />
                  </TabsContent> */}
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Kulkita. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </main>
  );
}
