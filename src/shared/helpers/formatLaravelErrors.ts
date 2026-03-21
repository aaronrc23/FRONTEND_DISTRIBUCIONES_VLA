export const formatLaravelErrors = (errors: Record<string, string[]>) => {
    return `
        <ul style="text-align:left; margin-top:8px;">
            ${Object.values(errors)
            .flat()
            .map(err => `<li>• ${err}</li>`)
            .join('')}
        </ul>
    `;
};
