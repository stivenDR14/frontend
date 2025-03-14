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
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading || isStreaming}
            className="bg-blue-500 bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600 hover:bg-gray-600 disabled:bg-gray-400 disabled:bg-gray-800 transition-colors"
          >
            {isLoading ? "Sending..." : isStreaming ? "Receiving..." : "Send"}
          </button>
        </div>
      </form>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
          Error: {error}
        </div>
      )}
    </>
  );
}
