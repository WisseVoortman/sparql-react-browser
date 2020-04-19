export const getTextFromUri = (uri) => {
    let charStartSlash = uri.lastIndexOf('/');
    let charStartHash = uri.lastIndexOf('#');
    let charStart = (charStartSlash > charStartHash ? charStartSlash : charStartHash) + 1;
    return uri.substr(charStart, 20);
  };

export const isValidUri = (input) => (
    /^(http|https):\/\/[^ "]+$/.test(input)
  );

export const addTripleToArray = (rdfData, subject, property, object) => {
    rdfData.push({
        subject: subject,
        property: property,
        object: object,
      });
    return rdfData;
  };
