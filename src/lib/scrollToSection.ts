/** Scroll to a home-page section by id (without leading #). */
export function scrollToSectionId(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  }
  return false;
}

export function hashToSectionId(hash: string): string {
  return hash.replace(/^#/, "");
}
