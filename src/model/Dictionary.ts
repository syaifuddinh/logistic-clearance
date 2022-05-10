const index = [
    {
      slug: "eng",
      name: "english",
      lang : "en-US",
      image: require("../assets/icons/usa.svg"),
    },
    {
      slug: "idn",
      name: "indonesia",
      lang : "id-ID",
      image: require("../assets/icons/idn.svg"),
    },
];


const getChosen = () => {
    let result = "";
    const language = localStorage.getItem("language");
    if (language) {
        result = language;
    }

    return result;
};

const getChosenObj = slug => {
  let result: any = {};
  let chosen:any = {};
  if (slug) {
    chosen = index.find(x => x.slug == slug);
    if (chosen) {
      result = chosen;
    }
  }

  return result;
};

const Dictionary = {
    index: index,
    getChosen : getChosen,
    getChosenName : () => {
        let r: any = {};
        const slug = getChosen();
        if (slug) {
          r = getChosenObj(slug);
          r = r.name;
        }

        return r;
    },
    getChosenLang : () => {
        let r: any = {};
        const slug = getChosen();
        if (slug) {
          r = getChosenObj(slug);
          r = r.lang
        }

        return r;
    },
    getChosenObj : getChosenObj,
    getCurrentChosenObj : () => {
        let r:any = {}
        const slug = getChosen()
        if(slug) {
            r = getChosenObj(slug)
        }

        return r;
    },
    setChosen : (slug) => {
        let chosen = getChosenObj(slug)
        if(chosen) {
            localStorage.setItem("i18nextLng", chosen.lang);
        }
        localStorage.setItem("language", slug);
    },
    removeChosen : () => {
        localStorage.removeItem("language");
    }
};

export default Dictionary;
