export function getWrite(name) {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch {
      return '';
    };
  }

export function setWrite(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function clearAll() {
  localStorage.clear();
}
