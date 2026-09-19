/**
 * ============================================================================
 *  CoverIQ Comics — data source
 * ============================================================================
 *
 *  This file is the SINGLE source of truth for the Comics section.
 *  The library view (ComicsPage) and the book reader (ComicReader) both read
 *  from the `COMICS` array below.
 *
 *  ----------------------------------------------------------------------------
 *  HOW TO ADD THE REAL FRONT COVER
 *  ----------------------------------------------------------------------------
 *  1. Drop the cover image into:
 *         public/comics/captain-coveriq/cover.png   (or keep cover.svg)
 *     Recommended: portrait, 2:3 ratio (e.g. 1000 x 1500).
 *  2. If you use a different extension than the current placeholder, update the
 *     ONE `coverImage` line for that comic below to match (e.g. ".png").
 *     A placeholder `cover.svg` already ships so nothing looks broken.
 *
 *  ----------------------------------------------------------------------------
 *  HOW TO ADD A NEW INTERIOR PAGE (one at a time, up to ~28)
 *  ----------------------------------------------------------------------------
 *  1. Save the page image into the comic's folder using a zero-padded, ordered
 *     filename:
 *         public/comics/captain-coveriq/page-01.png
 *         public/comics/captain-coveriq/page-02.png
 *         ...
 *  2. Add ONE line to that comic's `pages` array below, in reading order:
 *         `${CAPTAIN_COVERIQ_DIR}/page-01.png`,
 *
 *  That's it. The reader automatically shows: [cover] then every page in
 *  `pages`, updates the "X / Y" counter, and enables flipping. While `pages`
 *  is empty, the reader shows the cover with a tasteful "More pages coming
 *  soon" state instead of blank/broken pages.
 *
 *  Tip: keep filenames zero-padded (page-01, page-02, ... page-10) so they
 *  sort correctly in the folder and are easy to scan.
 * ============================================================================
 */

export interface Comic {
  /** Stable unique id (used as React key). */
  id: string;
  /** URL-safe slug used in the reader deep link, e.g. /comics?issue=<slug>. */
  slug: string;
  /** Display title. */
  title: string;
  /** Short issue label, e.g. "Issue #1". Optional. */
  issue?: string;
  /** One or two sentence blurb shown on the library card. */
  description: string;
  /** Path (relative to /public) to the front cover image. */
  coverImage: string;
  /**
   * Ordered list of INTERIOR page image paths (cover excluded — it lives in
   * `coverImage`). Add one line per page. Leave empty until pages exist.
   */
  pages: string[];
}

/** Base folder for the Captain CoverIQ issue art. */
const CAPTAIN_COVERIQ_DIR = "/comics/captain-coveriq";

export const COMICS: Comic[] = [
  {
    id: "captain-coveriq-01",
    slug: "captain-coveriq-issue-1",
    title: "The Greed Syndicate",
    issue: "CoverIQ Chronicles · Vol. I",
    description:
      "Behind every problem there is a plan, and behind every plan there is greed. As the Greed Syndicate — Identity Thief, Fine Print Bandit, Deductible Doom, Marshal Delay, and the Claim Crushers — moves to break your claim, Captain CoverIQ and his team fight for a safer, smarter, stronger tomorrow. Volume I; interior pages are on the way.",
    coverImage: `${CAPTAIN_COVERIQ_DIR}/cover.jpg`,
    pages: [
      // ↓↓↓ Add interior pages here, one line each, in reading order. ↓↓↓
      // `${CAPTAIN_COVERIQ_DIR}/page-01.png`,
      // `${CAPTAIN_COVERIQ_DIR}/page-02.png`,
      // ...up to ~28
    ],
  },
];

/** Look up a single comic by its slug (used by the reader deep link). */
export function getComicBySlug(slug: string | null | undefined): Comic | undefined {
  if (!slug) return undefined;
  return COMICS.find((c) => c.slug === slug);
}

/**
 * The full ordered list of "leaves" the reader flips through:
 * the cover first, then every interior page.
 */
export function getReaderPages(comic: Comic): string[] {
  return [comic.coverImage, ...comic.pages];
}

/** How many interior pages exist (excludes the cover). */
export function interiorPageCount(comic: Comic): number {
  return comic.pages.length;
}
