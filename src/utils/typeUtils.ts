/**
 * Utility function to convert a custom type JSON object into URL parameters.
 * @param json - The input JSON object to be converted. Must be a non-null object.
 * @returns A string representing the URL parameters.
 * @throws Will throw an error if the input is not a non-null object.
 */
export function createUrlParamsFromCustomType(json: unknown): string {
  if (typeof json === "object" && json !== null) {
    const stringified: string = JSON.stringify(json);
    const params: string = new URLSearchParams(
      JSON.parse(stringified)
    ).toString();
    return params;
  } else {
    throw new Error("Input must be a non-null object");
  }
}
