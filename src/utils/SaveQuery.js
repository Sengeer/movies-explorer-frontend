export function removeQuery() {
    localStorage.removeItem('query');
  }

export function getQuery() {
    try {
      return JSON.parse(localStorage.getItem('query'));
    } catch {
      return '';
    };
  }

export function setQuery(query) {
    localStorage.setItem('query', JSON.stringify(query));
  }
