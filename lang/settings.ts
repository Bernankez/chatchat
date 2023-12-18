export const fallbackLng = "en";
export const languages = [fallbackLng, "zh-CN"];
export const defaultNS = "translation";

export function createOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
