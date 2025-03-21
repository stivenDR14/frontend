export default function InputErrorContainer({
  handleSubmit,
  query,
  setQuery,
  isLoading,
  isStreaming,
  error,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  query: string;
  setQuery: (value: string) => void;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask here..."
            autoFocus
            className="w-full p-2 border rounded bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark border-foreground-light/20 dark:border-foreground-dark/20 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          />
          <button
            type="submit"
            disabled={isLoading || isStreaming}
            className="bg-secondary-light dark:bg-secondary-dark text-foreground-dark dark:text-foreground-dark px-4 py-2 rounded hover:bg-primary-light dark:hover:bg-primary-dark disabled:bg-secondary-light dark:disabled:bg-secondary-dark transition-colors"
          >
            {isLoading ? "Sending..." : isStreaming ? "Receiving..." : "Send"}
          </button>
        </div>
      </form>
      {error && (
        <div className="mb-4 p-3 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark rounded">
          Error: {error}
        </div>
      )}
    </>
  );
}
