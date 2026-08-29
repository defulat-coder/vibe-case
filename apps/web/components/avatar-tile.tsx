import Image from "next/image";

export function avatarSrc(index: number) {
  return `/avatars/waker-avatar-hq-${String((index % 100) + 1).padStart(3, "0")}.webp`;
}

export function AvatarTile({ index, className = "", alt, priority = false }: { index: number; className?: string; alt?: string; priority?: boolean }) {
  return (
    <div className={`avatar-tile ${className}`}>
      <Image src={avatarSrc(index)} alt={alt ?? `Vibe Case 灵感角色 ${index + 1}`} width={512} height={512} sizes="(max-width: 760px) 45vw, 260px" priority={priority} />
    </div>
  );
}
