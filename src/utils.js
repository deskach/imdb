export function getStorage(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';

    storage.setItem(x, x);
    storage.removeItem(x);

    return storage;
  }
  catch (e) {
    return null;
  }
}
