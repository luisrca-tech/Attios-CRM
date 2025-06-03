export function useWorkspace() {
  const url = window.location.hostname;
  const splitUrl = url.split(".");
  const hasSubdomain = splitUrl.length >= 2 && splitUrl[0] !== "www";
  const workspace = hasSubdomain ? splitUrl[0] : null;

  return { workspace };
}
