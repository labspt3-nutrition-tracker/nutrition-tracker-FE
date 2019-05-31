export const makeRandomColor = () => {
  var c = "";
  while (c.length < 6) {
    c += Math.random()
      .toString(16)
      .substr(-6)
      .substr(-1);
  }
  return "#" + c;
};
