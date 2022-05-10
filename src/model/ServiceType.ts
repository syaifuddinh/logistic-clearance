const index = [
    {
      slug: "export",
      name: "export",
      image: require("../assets/icons/pallet-stack-up.svg"),
      description:
        "Streamlining of order handling, transportation, inventory management and handling, storage, packaging, and clearing of the export goods."
    },
    {
      slug: "import",
      name: "import",
      image: require("../assets/icons/pallet-stack-down.svg"),
      description:
        "Streamlining of order handling, transportation, inventory management and handling, storage, packaging, and clearing of the export goods."
    },
    {
      slug: "domestic",
      name: "domestic",
      image: require("../assets/icons/truck.svg"),
      description:
        "Streamlining of order handling, transportation, inventory management and handling, storage, packaging, and clearing of the export goods."
    },
    {
      slug: "freeTradeZone",
      name: "free trade zone",
      image: require("../assets/icons/crane.svg"),
      description:
        "Streamlining of order handling, transportation, inventory management and handling, storage, packaging, and clearing of the export goods."
    }
];

const getChosen = () => {
    let result = "";
    const serviceType = localStorage.getItem("serviceType");
    if (serviceType) {
        result = serviceType;
    }

    return result;
};

const ServiceType = {
    index: index,
    getChosen : getChosen,
    getChosenName : () => {
        let result = "";
        let chosen:any = {}
        const serviceType = getChosen();
        if(serviceType) {
            chosen = index.find(x => x.slug == serviceType);
            if(chosen) {
                result = chosen.name
            }

        }

        return result;
    },
    getChosenImage : () => {
        let result:any = {};
        let chosen:any = {}
        const serviceType = getChosen();
        if(serviceType) {
            chosen = index.find(x => x.slug == serviceType);
            if(chosen) {
                result = chosen.image
            }

        }

        return result;
    },
    setChosen : (slug) => {
        localStorage.setItem("serviceType", slug);
    },
    removeChosen : () => {
        localStorage.removeItem("serviceType");
    }
};

export default ServiceType;
