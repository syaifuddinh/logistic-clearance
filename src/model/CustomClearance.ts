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
        slug: "documentRelease",
        name: "SPPB Release",
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
        slug: "requestForm",
        name: "Request Form",
        defaultIcon: "grayCircleCheck.svg",
        primaryIcon: "purpleCircleCheck.svg",
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
        slug: "confirmPayment",
        name: "Payment & Confirmation",
        defaultIcon: "blackCreditCard.png",
        primaryIcon: "purpleCreditCard.svg",
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
    }
];

const instructions = [
    {
        slug: "customerDetail",
        name: "Customer Detail"
    },
    {
        slug: "documentInformation",
        name: "Document Information"
    },
    {
        slug: "wizard.bottom.reviewRequest",
        name: "Review Request"
    }
];

const getStatusByIndex = index => statuses[index - 1].name;
const getDelegateStatusByIndex = index => delegateStatuses[index - 1].name;

const CustomClearance = {
    statuses: statuses,
    instructions: instructions,
    delegateStatuses: delegateStatuses,
    delegateInstructions: delegateInstructions,
    getStatusByIndex: getStatusByIndex,
    getDelegateStatusByIndex: getDelegateStatusByIndex
};

export default CustomClearance;
