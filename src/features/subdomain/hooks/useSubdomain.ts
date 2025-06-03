export function useSubdomain() {
  const url = window.location.hostname;
  const splitUrl = url.split(".");
  const hasSubdomain = splitUrl.length >= 2 && splitUrl[0] !== "www";
  const subdomain = hasSubdomain ? splitUrl[0] : null;

  return { subdomain };
}
