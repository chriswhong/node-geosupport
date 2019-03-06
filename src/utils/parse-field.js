module.exports = (layouts, name, wa) => {
  const layout = layouts.find(d => d.name === name);
  return wa.substring(parseInt(layout.from, 10) - 1, parseInt(layout.to, 10));
};
