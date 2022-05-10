const statuses = [
    {
        slug: "requestForm",
        name: "Request Form",
        defaultIcon: "blackEdit.svg",
        primaryIcon: "purpleEdit.png",
        image: require("../assets/icons/iwizard1.svg")
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
        name: "Payment & Confirmation",
        defaultIcon: "blackCreditCard.png",
        primaryIcon: "purpleCreditCard.svg",
        image: require("../assets/icons/payment.svg")
    },
    {
        slug: "sp2Release",
        name: "SP2 & Invoice Released",
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
        slug: "proformaInvoice",
        name: "Proforma Invoice",
        defaultIcon: "blackPaper.svg",
        primaryIcon: "purplePaper.png",
        image: require("../assets/icons/iwizard3.svg")
    },
    {
        slug: "paymentConfirmation",
        name: "Payment & Confirmation",
        defaultIcon: "blackCreditCard.png",
        primaryIcon: "purpleCreditCard.svg",
        image: require("../assets/icons/iwizard4.svg")
    },
    {
        slug: "documentRelease",
        name: "SP2 Release",
        defaultIcon: "blackPaperText.svg",
        primaryIcon: "purplePaperText.png",
        image: require("../assets/icons/iwizard5.svg")
    }
];

const delegateInstructions = [
    { 
        slug: "contractNumber",
        name: "Contract Number"
    },
    { 
        slug: "wizard.bottom.uploadDocument",
        name: "Upload Document"
      },
      { 
        slug: "wizard.bottom.reviewRequest",
        name: "Review Request"
    },
];


const instructions = [
    {
        slug: "wizard.bottom.requestorDetail",
        name: "Requestor Detail"
      },
      {
        slug: "selectContainer",
        name: "Select Container"
    },
    {
        slug: "wizard.bottom.reviewRequest",
        name: "Review Request"
    }
];

const getDelegateStatusByIndex = index => delegateStatuses[index - 1].name;

const SP2 = {
    statuses: statuses,
    instructions: instructions,
    delegateStatuses: delegateStatuses,
    delegateInstructions: delegateInstructions,
    getDelegateStatusByIndex: getDelegateStatusByIndex
};

export default SP2;
