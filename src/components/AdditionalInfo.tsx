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
      <div className="additionalInfoHolder">
        <div className="startedTodayInfo">{startedMessage}</div>
      </div>
      <div className="additionalInfoHolder">
        <div className="whenLeaveInfo">{whenLeaveMessage}</div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
