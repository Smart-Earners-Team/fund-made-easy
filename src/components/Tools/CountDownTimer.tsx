import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { uniqueId } from "lodash";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 60,
  strokeWidth: 2,
};

const renderTime = (time: number) => {
  return (
    <div className="text-xl">
      <div className="time">{time}</div>
    </div>
  );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

export default React.memo(function CoundownTimer({
  timestamp,
  handleDisableButton,
}: {
  timestamp: number;
  handleDisableButton: (state: boolean) => void;
}) {
  // These come from the blockchain
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = timestamp; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;

  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const color = "#2DA79A";

  return (
    <div className="grid grid-cols-4 grid-rows-1 place-items-center">
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors={color}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
          key={uniqueId()}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime(getTimeDays(daysDuration - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <div className="text-xs mt-2" style={{ color: color }}>
          Days
        </div>
      </div>
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors={color}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
          key={uniqueId()}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime(getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <div className="text-xs mt-2" style={{ color: color }}>
          Hours
        </div>
      </div>
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors={color}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
          key={uniqueId()}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime(getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <div className="text-xs mt-2" style={{ color: color }}>
          Minutes
        </div>
      </div>
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors={color}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => {
            const repeat = remainingTime - totalElapsedTime > 0;
            handleDisableButton(repeat);
            return {
              shouldRepeat: repeat,
            };
          }}
          key={uniqueId()}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime(getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <div className="text-xs mt-2" style={{ color: color }}>
          Seconds
        </div>
      </div>
    </div>
  );
});
