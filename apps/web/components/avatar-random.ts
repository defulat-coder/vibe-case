const allAvatarIndices = Array.from({ length: 100 }, (_, index) => index);

export function avatarIndexForKey(key: string) {
  let hash = 0;
  for (const character of key) hash = (hash * 31 + (character.codePointAt(0) ?? 0)) >>> 0;
  return hash % allAvatarIndices.length;
}

export function createAvatarSampler(random = Math.random) {
  const assignments = new Map<string, number>();
  const pools = new Map<string, number[]>();

  return (slot: string, candidates: readonly number[] = allAvatarIndices) => {
    const valid = [...new Set(candidates.filter((index) => Number.isInteger(index) && index >= 0 && index < 100))];
    const source = valid.length ? valid : allAvatarIndices;
    const group = source.join(",");
    const assignmentKey = `${group}|${slot}`;
    const assigned = assignments.get(assignmentKey);
    if (assigned !== undefined) return assigned;

    let pool = pools.get(group);
    if (!pool?.length) {
      pool = [...source];
      for (let index = pool.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
      }
      pools.set(group, pool);
    }

    const selected = pool.pop() ?? source[0];
    assignments.set(assignmentKey, selected);
    return selected;
  };
}

export const sampleAvatar = createAvatarSampler();
