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

export function strCmp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }

  return 0;
}

export function numCmp(a, b) {
  return a - b;
}

