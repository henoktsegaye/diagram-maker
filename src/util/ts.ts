import { Color } from "../types";

export const NeitherNullNorUndefined = <T>(
  type: T | null | undefined
): boolean => {
  return type !== null && type !== undefined;
};

export const isColor = (color: string): color is Color => {
    if(color === 'transparent') {
        return true;
    }
    const isColor =  color.startsWith('#') && color.length < 10
    if(!isColor) {
        console.warn(`color ${color} is not a valid color`)
    }
    return isColor
}