// Gotten from https://stackoverflow.com/questions/49269102/replace-ios-11-smart-punctuation-with-javascript-regex
export function cleanString(s: string | undefined): string | undefined {
    return (
        s &&
        s
            .trim()
            .replace(/[\u2018\u2019\u201C\u201D]/g, c =>
                '\'\'""'.substr('\u2018\u2019\u201C\u201D'.indexOf(c), 1)
            )
    );
}
