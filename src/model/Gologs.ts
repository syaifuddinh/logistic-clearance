const renameFile = fileName => {
    let doc: string = fileName;
    if (doc) {
        doc = doc.replace(
            /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}-(.+)/,
            "$1"
        );
        doc = doc.replace(/(.+\.[a-zA-Z]{3})\.[a-zA-Z]{3}/, "$1");
    }

    return doc;
};

const Gologs = {
    customerServiceEmail: "cs@go-logs.com",
    customerServicePhone: "021 2345 678",
    renameFile : renameFile
};

export default Gologs;
