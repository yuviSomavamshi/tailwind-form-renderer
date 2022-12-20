export default function Spinner({ children }) {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="flex flex-row">
        <div className="text-base text-black mr-1">{children}</div>
        <div className="flex flex-row mt-2 items-center justify-center space-x-1 animate-pulse">
          <div className="bg-cds-blue-0600 w-2 h-1 rounded-full animate-bounce" />
          <div className="bg-cds-green-0600 w-2 h-1 rounded-full animate-bounce" />
          <div className="bg-cds-red-0600 w-2 h-1 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
