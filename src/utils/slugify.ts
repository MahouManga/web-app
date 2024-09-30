const slugify = require('slugify');

export default function genSlug(str: String) {
    return slugify(str, {
        lower: true,     // Converte para minúsculas
        strict: true     // Remove caracteres especiais
    });
}