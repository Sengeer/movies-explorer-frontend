export function removeWrite(name) {
    localStorage.removeItem(name);
  }

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
