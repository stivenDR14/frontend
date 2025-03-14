export default function ChatHistory({
  responseChunks,
  toolUses,
  toolOutputs,
}: {
  responseChunks: string;
  toolUses: string[];
  toolOutputs: string[];
}) {
  return (
    <div className="flex-1 overflow-auto border rounded p-4">
      {responseChunks !== "" ? (
        <div className="mb-4">{responseChunks}</div>
      ) : (
        <p className="text-secondary-500 mb-4">
          Ask a question to get started.
        </p>
      )}

      {/* Show tools used */}
      {toolUses.length > 0 && (
        <div className="mt-4 p-3 bg-secondary-800 rounded">
          <h3 className="font-bold mb-2">Tools Used:</h3>
          <ul className="list-disc pl-5">
            {toolUses.map((tool, index) => (
              <li key={`tool-${index}`} className="mb-1">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show tool results */}
      {toolOutputs.length > 0 && (
        <div className="mt-4 p-3 bg-secondary-800 rounded">
          <h3 className="font-bold mb-2">Tool Results:</h3>
          <ul className="list-disc pl-5">
            {toolOutputs.map((output, index) => (
              <li key={`output-${index}`} className="mb-1">
                {typeof output === "string" && output.startsWith("{")
                  ? JSON.parse(output).output
                  : output}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
