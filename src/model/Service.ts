const index = [
    {
        slug: "do",
        name: "DO",
        image: require("../assets/icons/cargo-ship.svg"),
        url: "/do-request/create",
        description: "-"
    },
    {
        slug: "sp2",
        name: "SP2",
        image: require("../assets/icons/colorfulNote.svg"),
        url: "/sp2-request/create",
        description: "-"
    },
    {
        slug: "customClearance",
        name: "Custom Clearance",
        image: require("../assets/icons/insurance.svg"),
        url: "/custom-clearance-request/create",
        description: "-"
    },
    {
        slug: "trucking",
        name: "trucking",
        image: require("../assets/icons/pickup.svg"),
        description:
            "Book, manage, track & trace trucks online and in real-time.",
        isDisabled: true
    }
];

const Service = {
    index: index
};

export default Service;
