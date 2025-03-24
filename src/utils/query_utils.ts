export function jsonToQuery(json: Record<string, any>) {
    const queryParams: string[] = [];

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];

            if (value === null || value === undefined) continue;

            if (Array.isArray(value)) {
                value.forEach((v) => {
                    queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
                });
            } else {
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    }

    return queryParams.join("&");
}