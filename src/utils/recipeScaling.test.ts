import { scaleAndConvertAmount } from './recipeScaling';

export function runRecipeScalingTests() {
  const tests = [
    // Whole numbers
    { input: '2 cups', multiplier: 2, system: 'original', expected: '4 cups' },
    { input: '500g', multiplier: 2, system: 'original', expected: '1000g' },
    
    // Fractions
    { input: '1/2 tsp', multiplier: 2, system: 'original', expected: '1 tsp' },
    { input: '3/4 cup', multiplier: 2, system: 'original', expected: '1 1/2 cup' },

    // Ranges
    { input: '1-2 cloves', multiplier: 2, system: 'original', expected: '2-4 cloves' },
    { input: '1–2 tbsp', multiplier: 3, system: 'original', expected: '3-6 tbsp' },

    // Instructions / non-numeric
    { input: 'Salt and freshly ground black pepper to taste', multiplier: 2, system: 'original', expected: 'Salt and freshly ground black pepper to taste' },
    { input: 'A pinch of saffron', multiplier: 2, system: 'original', expected: 'A pinch of saffron' },

    // Metric <-> Imperial
    { input: '500 g', multiplier: 1, system: 'imperial', expected: '1 lb' },
    { input: '2 cups', multiplier: 1, system: 'metric', expected: '473.2 ml' },
  ];

  let passed = 0;
  tests.forEach((t, i) => {
    const res = scaleAndConvertAmount(t.input, t.multiplier, t.system as any);
    if (res === t.expected) {
      passed++;
    } else {
      console.warn(`Recipe Scaling Test ${i + 1} failed for "${t.input}": got "${res}", expected "${t.expected}"`);
    }
  });

  console.log(`Recipe Scaling Automated Tests: ${passed}/${tests.length} passed.`);
  return passed === tests.length;
}
