import { ANIMATION_DURATION } from "./constants";

export function convertMsToSeconds(duration: number): number {
  return Number((duration / ANIMATION_DURATION).toFixed(2));
}
