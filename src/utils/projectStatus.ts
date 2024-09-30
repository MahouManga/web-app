// utils/utils.ts

export function getStatusText(statusValue: number): string {
    const statusMap: { [key: number]: string } = {
        1: "Em Breve",
        2: "Publicando",
        3: "Completo",
        4: "Hiato",
        5: "Descontinuado",
    };
    return statusMap[statusValue] || "Unknown status";
}

export function getColors(statusValue: number) {
    const statusMap: { [key: number]: string } = {
        1: "bg-purple-500",  // Upcoming
        2: "bg-green-700", // Publicando
        4: "bg-yellow-500", // Hiato
        3: "bg-red-500", // Completado
        5: "bg-gray-500", // Descontinuado
    };
    return statusMap[statusValue] || "bg-gray-300";
}