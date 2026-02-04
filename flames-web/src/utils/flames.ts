export type FlamesResult = "Friends" | "Lovers" | "Affectionate" | "Marriage" | "Enemies" | "Siblings";

export const getFlamesResult = (name1: string, name2: string): { remainingCount: number, result: FlamesResult } => {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();

  // Special case for Nithwin and Akhila
  if ((n1 === "nithwin" && n2 === "akhila") || (n1 === "akhila" && n2 === "nithwin")) {
      return { remainingCount: 0, result: "Marriage" };
  }

  const alpha1 = n1.replace(/[^a-z]/g, "").split("");
  const alpha2 = n2.replace(/[^a-z]/g, "").split("");

  for (let i = 0; i < alpha1.length; i++) {
    const char = alpha1[i];
    const indexIn2 = alpha2.indexOf(char);
    if (indexIn2 !== -1) {
      alpha1.splice(i, 1);
      alpha2.splice(indexIn2, 1);
      i--; // Adjust index since we removed an element
    }
  }

  const count = alpha1.length + alpha2.length;
  
  if (count === 0) return { remainingCount: 0, result: "Friends" }; // Default or specific case implementation

  let flames: FlamesResult[] = ["Friends", "Lovers", "Affectionate", "Marriage", "Enemies", "Siblings"];

  while (flames.length > 1) {
    let indexToRemove = (count % flames.length) - 1;
    if (indexToRemove < 0) {
        indexToRemove = flames.length - 1;
    }
    // Remove the element and shift the array to start from the next element
    const right = flames.slice(0, indexToRemove);
    const left = flames.slice(indexToRemove + 1);
    flames = [...left, ...right];
  }

  return { remainingCount: count, result: flames[0] };
};
