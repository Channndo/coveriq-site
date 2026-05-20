import { useRef } from "react";
import {
  ACCOUNT_AVATARS,
  getAvatarById,
  MAX_AVATAR_PHOTO_BYTES,
} from "../../lib/accountAvatars";
import type { ConsumerUser } from "../../lib/consumerSession";
import { updateConsumerProfile } from "../../lib/consumerSession";

interface AccountAvatarPickerProps {
  user: ConsumerUser;
  onChange: () => void;
}

function initials(user: ConsumerUser): string {
  const a = user.firstName?.[0] ?? "";
  const b = user.lastName?.[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

export function AccountAvatarPicker({ user, onChange }: AccountAvatarPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const preset = getAvatarById(user.avatarId);
  const showInitials = preset.id === "slate-initials" && !user.avatarPhoto;

  const selectPreset = (id: string) => {
    updateConsumerProfile({ avatarId: id, avatarPhoto: undefined });
    onChange();
  };

  const onPhoto = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_AVATAR_PHOTO_BYTES) {
      alert("Please choose an image under 180 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== "string") return;
      updateConsumerProfile({ avatarPhoto: dataUrl });
      onChange();
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Profile photo</h2>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div
          className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${preset.gradient} text-3xl shadow-lg shadow-black/30`}
        >
          {user.avatarPhoto ? (
            <img src={user.avatarPhoto} alt="" className="h-full w-full object-cover" />
          ) : showInitials ? (
            <span className="font-display text-2xl font-bold text-white">{initials(user)}</span>
          ) : (
            <span aria-hidden>{preset.glyph}</span>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-sm text-slate-400">
            Choose a preset avatar or upload a photo (saved on this device).
          </p>
          <div className="flex flex-wrap gap-2">
            {ACCOUNT_AVATARS.map((a) => (
              <button
                key={a.id}
                type="button"
                title={a.label}
                onClick={() => selectPreset(a.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-gradient-to-br text-lg transition ${
                  user.avatarId === a.id || (!user.avatarId && a.id === "cyan-brain")
                    ? "border-cyan-400/60 ring-2 ring-cyan-500/30"
                    : "border-white/10 hover:border-white/25"
                } ${a.gradient}`}
              >
                {a.glyph || (
                  <span className="font-mono text-[10px] font-bold text-white">AB</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
              onClick={() => fileRef.current?.click()}
            >
              Upload photo
            </button>
            {user.avatarPhoto && (
              <button
                type="button"
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300"
                onClick={() => {
                  updateConsumerProfile({ avatarPhoto: undefined });
                  onChange();
                }}
              >
                Remove photo
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
        </div>
      </div>
    </section>
  );
}
