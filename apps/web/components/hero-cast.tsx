import { AvatarTile } from "./avatar-tile";

const cast = [0, 11, 24, 39, 53, 67, 82, 97];

export function HeroCast() {
  return (
    <div className="hero-cast" aria-label="Vibe Case 灵感角色群像">
      {cast.map((index, position) => <AvatarTile key={index} index={index} className={`hero-avatar hero-avatar-${position + 1}`} priority={position < 3} />)}
      <div className="hero-cast-note"><strong>92</strong><span>个 UI 案例<br />都能生成</span></div>
    </div>
  );
}
