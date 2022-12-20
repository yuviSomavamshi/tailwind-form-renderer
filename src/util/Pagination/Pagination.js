import classNames from "classnames";
import usePagination from "./usePagination";

export default function Pagination(props) {
  const { start, end } = getPagination(props.page, props.size, props.totalRecords);
  const { items } = usePagination(props);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          {props.count > 0 && (
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium px-1">{start}</span>
              to
              <span className="font-medium px-1">{end}</span>
              of
              <span className="font-medium px-1">{props.totalRecords}</span>
              results
            </p>
          )}
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {items.map((item, index) => (
              <div key={index}>
                {renderItem({
                  ...item,
                  count: props.count
                })}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function renderItem(item) {
  switch (item.type) {
    case "previous":
      return (
        <div
          className={classNames(
            "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 select-none cursor-pointer",
            {
              "bg-gray-200 hover:bg-gray-200": item.disabled
            }
          )}
          onClick={() => {
            if (!item.disabled) item.onClick();
          }}
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "next":
      return (
        <div
          className={classNames(
            "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 select-none cursor-pointer",
            {
              "bg-gray-200 hover:bg-gray-200": item.disabled
            }
          )}
          onClick={() => {
            if (!item.disabled) item.onClick();
          }}
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "first":
    case "last":
    case "page":
      return (
        <div
          className={classNames("z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium select-none cursor-pointer", {
            "bg-cds-ice-0050 border-cds-ice-0500 text-cds-ice-0600": item.selected,
            "border-gray-300 text-gray-500 hover:bg-gray-50": !item.selected
          })}
          onClick={item.onClick}
        >
          {" "}
          {item.page}{" "}
        </div>
      );
    case "end-ellipsis":
      return (
        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 select-none cursor-pointer">
          {" "}
          ...{" "}
        </span>
      );
    default:
  }
}

const getPagination = (page, size, count) => {
  const limit = size ? +size : 10;
  const offset = Number(page) * limit;
  return { limit, offset, start: offset - limit + 1, end: count < offset ? count : offset };
};
