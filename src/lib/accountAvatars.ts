export interface AccountAvatar {
  id: string;
  label: string;
  /** CSS gradient for preset avatar circle */
  gradient: string;
  /** Emoji or short glyph shown in the circle */
  glyph: string;
}

export const ACCOUNT_AVATARS: AccountAvatar[] = [
  { id: "cyan-brain", label: "MIRA", gradient: "from-cyan-500 to-blue-600", glyph: "🧠" },
  { id: "teal-shield", label: "Shield", gradient: "from-teal-500 to-emerald-600", glyph: "🛡️" },
  { id: "amber-book", label: "Scholar", gradient: "from-amber-500 to-orange-600", glyph: "📘" },
  { id: "violet-star", label: "Star", gradient: "from-violet-500 to-purple-600", glyph: "✦" },
  { id: "rose-heart", label: "Care", gradient: "from-rose-500 to-pink-600", glyph: "♥" },
  { id: "sky-home", label: "Home", gradient: "from-sky-500 to-indigo-600", glyph: "🏠" },
  { id: "lime-leaf", label: "Growth", gradient: "from-lime-500 to-green-600", glyph: "🌿" },
  { id: "slate-initials", label: "Classic", gradient: "from-slate-600 to-slate-800", glyph: "" },
];

export function getAvatarById(id: string | undefined): AccountAvatar {
  return ACCOUNT_AVATARS.find((a) => a.id === id) ?? ACCOUNT_AVATARS[0];
}

export const MAX_AVATAR_PHOTO_BYTES = 180_000;
