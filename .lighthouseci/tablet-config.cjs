module.exports = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      disabled: false,
    },
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },
};
