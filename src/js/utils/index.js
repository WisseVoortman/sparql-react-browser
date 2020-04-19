
export const getTextFromUri = (uri) => {
    var charStart = uri.lastIndexOf('/') + 1;
    return uri.substr(charStart, charStart + 20)
}
export const isValidUri = (input) => {
    return /^(http|https):\/\/[^ "]+$/.test(input);
}

export const addTripleToArray = (rdfData, subject, property, object) => {
    rdfData.push({
        "subject" : subject,
        "property": property,
        "object": object
    });
}
