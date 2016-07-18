import Q from 'q';

const regex = {
  textFile: /.txt$/
};

export const readTextFile = (file) => {
  if (!validateTextFile(file)) {
    return Q.reject({ error: 'Invalid file type' });
  }

  let reader = new FileReader(),
      dfd = Q.defer();
      
  reader.readAsText(file);
  reader.onload = () => dfd.resolve(reader.result);

  return dfd.promise;
};

export const validateTextFile = (file) => {
  return (typeof file === typeof {}) && (regex.textFile.test(file.name));
};