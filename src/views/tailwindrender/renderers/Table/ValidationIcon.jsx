import Tooltip from "../../../utilities/Tooltip";
import IconRenderer from "../../../IconRenderer";

const ValidationIcon = ({ errorMessages, id }) => {
  return (
    <Tooltip id={id} title={errorMessages} placement="bottom">
      <span className="mx-4 relative inline-block">
        <IconRenderer icon="NotificationsActive" />
        <span className="absolute -top-1 -right-4 px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">
          {errorMessages.split("\n").length}
        </span>
      </span>
    </Tooltip>
  );
};

export default ValidationIcon;
