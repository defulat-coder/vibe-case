"use client";

import Image from "next/image";
import { useId, useSyncExternalStore } from "react";
import { avatarIndexForKey, sampleAvatar } from "./avatar-random";

const noUpdates = () => () => {};

export function avatarSrc(index: number) {
  return `/avatars/waker-avatar-hq-${String((index % 100) + 1).padStart(3, "0")}.webp`;
}

export function AvatarTile({
  index = 0,
  className = "",
  alt,
  priority = false,
  randomKey,
  candidateIndices,
  dataKey,
}: {
  index?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  randomKey?: string;
  candidateIndices?: readonly number[];
  dataKey?: string;
}) {
  const generatedKey = useId();
  const resolvedIndex = useSyncExternalStore(
    noUpdates,
    () => sampleAvatar(randomKey ?? generatedKey, candidateIndices),
    () => index,
  );

  const displayedIndex = dataKey ? avatarIndexForKey(dataKey) : resolvedIndex;

  return (
    <div className={`avatar-tile ${className}`}>
      <Image src={avatarSrc(displayedIndex)} alt={alt ?? `Vibe Case 灵感角色 ${displayedIndex + 1}`} width={512} height={512} sizes="(max-width: 760px) 64px, 72px" priority={priority} />
    </div>
  );
}
