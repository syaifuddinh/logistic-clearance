import React, { useState } from "react";
import { Profile, ProfileIcon, NavText } from "../../../../styles/Header";

export default function GologsProfile(props) {
    const getName = () => {
        let name = "John";
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
            let jsn = JSON.parse(authUser);
            name = jsn.person.fullName;
            if (name.length - 18 > 5) {
                name = name.substring(0, 18)
                name += "...."
            }
        }

        return name;
    };
    
    return (
        <>
            <Profile className="h-35px md-h-52px">
                <ProfileIcon
                    src={require("../../../../assets/images/avatar.svg")}
                    className="h-35px md-h-52px"
                />
                <NavText className="mt-3 mr-3 d-none d-md-block">{getName()}</NavText>
            </Profile>
        </>
    );
}
