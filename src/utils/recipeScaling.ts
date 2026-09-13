export interface ScaledIngredient {
  name: string;
  amount: string;
  prepState: string;
  addedAtMinute: number;
  isArchiveSpecialty: boolean;
}

export type MeasurementSystem = 'original' | 'metric' | 'imperial';

// Helper to parse fractions or numbers
function parseNumberOrFraction(token: string): number | null {
  const t = token.trim();
  if (!t) return null;

  // Check fraction like "1/2", "3/4"
  if (t.includes('/')) {
    const parts = t.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return num / den;
      }
    }
  }

  const num = parseFloat(t);
  return isNaN(num) ? null : num;
}

// Format number back to readable quantity (decimals or fractions)
function formatQuantity(val: number): string {
  if (val <= 0) return '0';
  if (val >= 10) return Math.round(val).toString();

  // Check common fractions
  const tolerance = 0.05;
  const whole = Math.floor(val);
  const rem = val - whole;

  let fractionStr = '';
  if (Math.abs(rem - 0.25) < tolerance) fractionStr = '1/4';
  else if (Math.abs(rem - 0.33) < tolerance) fractionStr = '1/3';
  else if (Math.abs(rem - 0.5) < tolerance) fractionStr = '1/2';
  else if (Math.abs(rem - 0.66) < tolerance || Math.abs(rem - 0.67) < tolerance) fractionStr = '2/3';
  else if (Math.abs(rem - 0.75) < tolerance) fractionStr = '3/4';

  if (fractionStr) {
    return whole > 0 ? `${whole} ${fractionStr}` : fractionStr;
  }

  // Otherwise rounded decimal (1 decimal place if < 10)
  return val % 1 === 0 ? val.toString() : val.toFixed(1).replace(/\.0$/, '');
}

// Parse amount string like "500g", "2 cups", "1-2 cloves", "1/2 tsp"
export function scaleAndConvertAmount(
  amountStr: string,
  multiplier: number,
  system: MeasurementSystem
): string {
  if (!amountStr || typeof amountStr !== 'string') return amountStr;
  const trimmed = amountStr.trim();

  // If instruction-like or non-numeric
  if (
    trimmed.toLowerCase().includes('to taste') ||
    trimmed.toLowerCase().includes('pinch') ||
    trimmed.toLowerCase().includes('as needed') ||
    trimmed.toLowerCase().includes('optional') ||
    trimmed.toLowerCase().includes('garnish')
  ) {
    return trimmed;
  }

  // Check ranges like "1-2", "1–2", "1 to 2"
  const rangeMatch = trimmed.match(/^([\d\/\.]+)\s*([-–]|to)\s*([\d\/\.]+)(.*)$/i);
  if (rangeMatch) {
    const minVal = parseNumberOrFraction(rangeMatch[1]);
    const maxVal = parseNumberOrFraction(rangeMatch[3]);
    const unitPart = rangeMatch[4].trim();

    if (minVal !== null && maxVal !== null) {
      const scaledMin = minVal * multiplier;
      const scaledMax = maxVal * multiplier;
      const formattedMin = formatQuantity(scaledMin);
      const formattedMax = formatQuantity(scaledMax);
      return `${formattedMin}-${formattedMax}${unitPart ? ' ' + unitPart : ''}`;
    }
  }

  // Single quantity with unit like "500 g", "2 cups", "1.5 tbsp", "1/2 tsp"
  const singleMatch = trimmed.match(/^([\d\/\.]+)\s*(.*)$/);
  if (!singleMatch) return trimmed;

  const numVal = parseNumberOrFraction(singleMatch[1]);
  if (numVal === null) return trimmed;

  let val = numVal * multiplier;
  let unit = singleMatch[2].trim();

  // Measurement unit conversion (Metric <-> Imperial)
  if (system === 'metric') {
    const uLower = unit.toLowerCase();
    if (uLower === 'oz' || uLower === 'ounce' || uLower === 'ounces') {
      val *= 28.3495;
      unit = val >= 1000 ? 'kg' : 'g';
      if (unit === 'kg') val /= 1000;
    } else if (uLower === 'lb' || uLower === 'lbs' || uLower === 'pound' || uLower === 'pounds') {
      val *= 453.592;
      unit = val >= 1000 ? 'kg' : 'g';
      if (unit === 'kg') val /= 1000;
    } else if (uLower === 'fl oz' || uLower === 'fluid ounce') {
      val *= 29.5735;
      unit = val >= 1000 ? 'L' : 'ml';
      if (unit === 'L') val /= 1000;
    } else if (uLower === 'cup' || uLower === 'cups') {
      val *= 236.588;
      unit = val >= 1000 ? 'L' : 'ml';
      if (unit === 'L') val /= 1000;
    }
  } else if (system === 'imperial') {
    const uLower = unit.toLowerCase();
    if (uLower === 'g' || uLower === 'gram' || uLower === 'grams') {
      if (val >= 454) {
        val /= 453.592;
        unit = 'lb';
      } else {
        val /= 28.3495;
        unit = 'oz';
      }
    } else if (uLower === 'kg' || uLower === 'kilogram' || uLower === 'kilograms') {
      val *= 2.20462;
      unit = 'lb';
    } else if (uLower === 'ml' || uLower === 'milliliter' || uLower === 'milliliters') {
      if (val >= 240) {
        val /= 236.588;
        unit = 'cups';
      } else {
        val /= 29.5735;
        unit = 'fl oz';
      }
    } else if (uLower === 'l' || uLower === 'liter' || uLower === 'liters') {
      val *= 4.22675;
      unit = 'cups';
    }
  }

  const formattedVal = formatQuantity(val);
  return unit ? `${formattedVal} ${unit}` : formattedVal;
}
