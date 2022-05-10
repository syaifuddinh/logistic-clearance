import React, { useState } from "react";
import { Image, Logo } from "../../../../styles/Sidebar";

export default function GologsLogo(props) {
    return (
      <>
        <Logo>
            <Image 
                src={require("../../../../assets/images/logo.png")} 
            />
        </Logo>
      </>
    );
}
