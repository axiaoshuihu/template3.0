 export function showEllipsis(data, nub) {
    var str = String(data);
    if (str.length > nub) { return str.slice(0, nub) + '...'; }
  }
