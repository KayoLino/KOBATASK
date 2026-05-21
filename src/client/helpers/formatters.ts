// Normlaiza espaços multiplos em um único espaço
export const normalizeSpaces = (value: string): string => {
    return value.replace(/\s+/g, ' ').trim();
}

// Formata nome (primeira letra maiúscula de cada palavra)
export const formatName = (name: string): string => {
    return normalizeSpaces(name)
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Formata email (lowercase e trim)
export const formatEmail = (email:string): string => {
    return email.trim().toLowerCase();
};