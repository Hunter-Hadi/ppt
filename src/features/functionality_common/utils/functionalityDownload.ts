export const downloadUrl = (file: Uint8Array, name: string, type: string = 'application/pdf') => {
    const blob = new Blob([file], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
};