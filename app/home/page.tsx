export default function HomeRoute() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl p-12 bg-white dark:bg-[#0b0b0b] rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">Home</h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-400 mb-6">
          This is the new <code>/home</code> route added to the App Router.
        </p>
        <a
          className="inline-block rounded px-4 py-2 bg-foreground text-background"
          href="/"
        >
          Visit root
        </a>
      </div>
    </main>
  );
}
