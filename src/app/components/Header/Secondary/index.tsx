import React, { useState } from "react";
import GologsLogo  from "../Components/GologsLogo";
import GologsProfile  from "../Components/GologsProfile";
import GologsLogout  from "../Components/GologsLogout";

export default function SecondaryHeader(props) {

    return (
          <div className="bg-white px-14px md-px-70px position-fixed fixed-top d-flex align-items-center justify-content-between">
              <div className="">
                    <GologsLogo />
              </div>
              <div className="d-flex align-items-center mr-5">
                  <span className="d-inline-block mr-3">
                        <GologsProfile />
                  </span>
                  <span>
                        <GologsLogout 
                            variant="secondary"
                        />
                  </span>
              </div>
          </div>  
    );
}
