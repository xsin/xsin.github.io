import { describe, expect, it } from 'vitest';
import { AMBIENT, AmbientBgm, chordSeconds, loopSeconds, seededRandom } from './ambientBgm';

describe('ambient bed', () => {
  it('moves one chord every two bars at 50 BPM', () => {
    expect(chordSeconds()).toBeCloseTo(9.6, 5);
    expect(loopSeconds()).toBeCloseTo(38.4, 5);
  });

  it('keeps the approved voicings', () => {
    expect(AMBIENT.chords).toEqual([
      [146.83, 220.0, 329.63],
      [116.54, 174.61, 261.63],
      [98.0, 146.83, 220.0],
      [110.0, 164.81, 293.66]
    ]);
  });

  it('repeats its bell pattern within a loop', () => {
    const first = seededRandom(7);
    const second = seededRandom(7);
    const a = [first(), first(), first(), first()];
    const b = [second(), second(), second(), second()];
    expect(a).toEqual(b);
    expect(a.every((value) => value >= 0 && value < 1)).toBe(true);
  });

  it('stays silent without Web Audio', async () => {
    expect(AmbientBgm.supported).toBe(false);

    const bgm = new AmbientBgm();
    await expect(bgm.enable()).resolves.toBe(false);
    expect(bgm.isOn).toBe(false);

    /* Toggling or disposing on a missing context must not throw. */
    await expect(bgm.toggle()).resolves.toBe(false);
    bgm.disable();
    bgm.dispose();
    expect(bgm.isOn).toBe(false);
  });
});
