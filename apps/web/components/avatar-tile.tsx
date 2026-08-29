"use client";

import Image from "next/image";
import { useId, useSyncExternalStore } from "react";
import { sampleAvatar } from "./avatar-random";

const noUpdates = () => () => {};

export function avatarSrc(index: number) {
  return `/avatars/waker-avatar-hq-${String((index % 100) + 1).padStart(3, "0")}.webp`;
}

export function AvatarTile({
  index,
  className = "",
  alt,
  priority = false,
  randomKey,
  candidateIndices,
}: {
  index: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  randomKey?: string;
  candidateIndices?: readonly number[];
}) {
  const generatedKey = useId();
  const resolvedIndex = useSyncExternalStore(
    noUpdates,
    () => sampleAvatar(randomKey ?? generatedKey, candidateIndices),
    () => index,
  );

  return (
    <div className={`avatar-tile ${className}`}>
      <Image src={avatarSrc(resolvedIndex)} alt={alt ?? `Vibe Case 灵感角色 ${resolvedIndex + 1}`} width={512} height={512} sizes="(max-width: 760px) 45vw, 260px" priority={priority} />
    </div>
  );
}
