import SigninButton from "@/components/UI/SigninButton";
import { getProviders } from "next-auth/react";
import Image from "next/image";

export default async function Signin() {
  const providers = await getProviders();
  return (
    <main className="flex-grow flex justify-center mt-24 md:space-x-6">
      <Image
        src="https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png"
        alt="Twitter banner"
        width={405}
        height={324}
        placeholder="blur"
        blurDataURL="https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png"
        className="hidden md:inline-flex rotate-6 object-cover max-h-[324px] w-auto"
      />
      <section className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="Twitter Logo"
          loading="lazy"
          width="128"
          className="object-cover mb-10"
        />
        <div className="flex flex-col gap-y-2 text-center">
          <p className="italic text-sm mb-8">
            This app is created for learning purposes
          </p>
          {providers &&
            Object.values(providers).map((provider) => (
              <SigninButton key={provider.id} {...provider} />
            ))}
        </div>
      </section>
    </main>
  );
}
