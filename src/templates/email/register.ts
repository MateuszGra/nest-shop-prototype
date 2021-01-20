export function registerEmailTemplate(userName): string {
    return `
        <h1>Witaj ${userName}.</h1>
        <p>Twoje konto zostało utworzone.</p>
    `
}