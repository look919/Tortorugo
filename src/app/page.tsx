import { cookies } from "next/headers";

export default async function Home() {
  const cookieAccess = cookies().get("accessId");

  async function setCookieOnCorrectInput(data: FormData) {
    "use server";

    const accessKey = data.get("key");

    if (accessKey === "525") {
      cookies().set("accessId", accessKey, {
        maxAge: 30 * 60 * 60,
      });
    }
  }

  console.log("cookieAccess", cookieAccess);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {cookieAccess ? (
        <div className="text-7xl">Jeszcze nie jest ready cnie</div>
      ) : (
        <form action={setCookieOnCorrectInput as any} className="flex flex-col">
          <input
            name="key"
            placeholder="525"
            className="mb-2 p-1 bg-transparent border-b"
          />
          <button type="submit" className="p-4 bg-cyan-600 rounded-sm">
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
