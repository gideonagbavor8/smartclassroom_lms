const apiBase =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

type HealthPayload = { ok: boolean; database: boolean };

export default async function Home() {
  let health: HealthPayload | null = null;
  let healthError: string | null = null;

  try {
    const res = await fetch(`${apiBase}/health`, { cache: "no-store" });
    if (!res.ok) healthError = `HTTP ${res.status}`;
    else health = (await res.json()) as HealthPayload;
  } catch {
    healthError = "Could not reach API (is Nest running?)";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fafafa] dark:bg-[#111]">
      <main className="max-w-lg w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          LearnMate Ghana
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          NACCA/GES-aligned LMS — assignments, quizzes, and low-bandwidth‑friendly flows.
        </p>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-left text-sm">
          <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            API status
          </p>
          {healthError && (
            <p className="text-amber-700 dark:text-amber-400">{healthError}</p>
          )}
          {!healthError && health && (
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>Healthy: {String(health.ok)}</li>
              <li>Database: {String(health.database)}</li>
            </ul>
          )}
          <p className="mt-3 text-xs text-gray-400">
            Endpoint:{" "}
            <code className="text-[11px] bg-gray-100 dark:bg-gray-900 px-1 rounded">
              {apiBase}/health
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
