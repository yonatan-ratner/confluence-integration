/**
 * Converts a custom type to a JSON object.
 *
 * @param json - The input value to be converted to JSON. It should be of type `unknown`.
 * @returns The JSON object representation of the input value, or empty JSON if its not a valid Object.
 * @throws May throw an error if the input value is not an object or if the JSON parsing fails.
 */
export function createUrlParamsFromCustomType(json: unknown): string {
    if (typeof json === "object") {
        const stringified = JSON.stringify(json)
        const params = new URLSearchParams(JSON.parse(stringified)).toString();
        return params
    }
    else {
        return JSON.parse("")
    }
}