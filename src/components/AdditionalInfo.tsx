import "../css/AdditionalInfo.css";

type AdditionalInfoProp = {
  startedMessage: string;
  whenLeaveMessage: string;
};

function AdditionalInfo({
  startedMessage,
  whenLeaveMessage,
}: AdditionalInfoProp) {
  return (
    <div>
      <div className="wt-additional-info-block">
        <div>{startedMessage}</div>
      </div>
      <div className="wt-additional-info-block">
        <div>{whenLeaveMessage}</div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
