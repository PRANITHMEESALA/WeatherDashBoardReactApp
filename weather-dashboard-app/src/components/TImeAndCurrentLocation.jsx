import React from "react";

const TImeAndCurrentLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p>{formattedLocalTime}</p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className=" text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TImeAndCurrentLocation;
