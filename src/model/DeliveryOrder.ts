const statuses = [
    {
        slug: "requestForm",
        name: "Request Form",
        defaultIcon: "blackEdit.svg",
        primaryIcon: "purpleEdit.png",
        image: require("../assets/icons/iwizard1.svg")
    },
    {
        slug: "confirmation",
        name: "Confirmation",
        defaultIcon: "grayCircleCheck.svg",
        primaryIcon: "purpleCircleCheck.svg",
        image: require("../assets/icons/iwizard2.svg")
    },
    {
        slug: "proformaInvoice",
        name: "Proforma Invoice",
        defaultIcon: "blackPaper.svg",
        primaryIcon: "purplePaper.png",
        image: require("../assets/icons/iwizard3.svg")
    },
    {
        slug: "paymentConfirmation",
        name: "Payment Confirmation",
        defaultIcon: "blackCreditCard.png",
        primaryIcon: "purpleCreditCard.svg",
        image: require("../assets/icons/iwizard4.svg")
    },
    {
        slug: "doRelease",
        name: "DO Release",
        defaultIcon: "blackPaperText.svg",
        primaryIcon: "purplePaperText.png",
        image: require("../assets/icons/iwizard5.svg")
    }
];

const delegateStatuses = [
    {
        slug: "delegate",
        name: "Delegate",
        defaultIcon: "blackEdit.svg",
        primaryIcon: "purpleEdit.png",
        image: require("../assets/icons/delegate.svg")
    },
    {
        slug: "confirmationFromThirdParty",
        name: "Confirmation from FF/PPJK",
        defaultIcon: "grayCircleCheck.svg",
        primaryIcon: "purpleCircleCheck.svg",
        image: require("../assets/icons/ffPpjk.svg")
    },
    {
        slug: "confirmationFromShippingLine",
        name: "Confirmation from Shipping Line",
        defaultIcon: "blackPaper.svg",
        primaryIcon: "purplePaper.png",
        image: require("../assets/icons/blueTruck.svg")
    },
    {
        slug: "proformaInvoice",
        name: "Proforma Invoice",
        defaultIcon: "blackCreditCard.png",
        primaryIcon: "purpleCreditCard.svg",
        image: require("../assets/icons/iwizard3.svg")
    },
    {
        slug: "paymentConfirmation",
        name: "Confirm Payment",
        defaultIcon: "blackPaperText.svg",
        primaryIcon: "purplePaperText.png",
        image: require("../assets/icons/iwizard4.svg")
    },
    {
        slug: "documentRelease",
        name: "Document Release",
        defaultIcon: "blackPaperText.svg",
        primaryIcon: "purplePaperText.png",
        image: require("../assets/icons/iwizard5.svg")
    }
];

const instructions = [
    { 
        slug : "wizard.bottom.blinformation",
        name : "B/L Information"
    },
    { 
        slug : "wizard.bottom.uploadDocument",
        name : "Upload Document"
      },
      { 
        slug : "wizard.bottom.reviewRequest",
        name : "Review Request"
    },
];

const delegateInstructions = [
    { 
        slug : "contractNumber",
        name : "Contract Number"
    },
    { 
        slug : "wizard.bottom.uploadDocument",
        name : "Upload Document"
      },
      { 
        slug : "wizard.bottom.reviewRequest",
        name : "Review Request"
    },
];

const getChosen = () => {
    let result = "";
    const serviceType = localStorage.getItem("serviceType");
    if (serviceType) {
        result = serviceType;
    }

    return result;
};

const getDelegateStatusByIndex = index => delegateStatuses[index - 1].name;

const DeliveryOrder = {
    statuses: statuses,
    instructions: instructions,
    delegateStatuses: delegateStatuses,
    delegateInstructions: delegateInstructions,
    getDelegateStatusByIndex: getDelegateStatusByIndex
};

export default DeliveryOrder;
