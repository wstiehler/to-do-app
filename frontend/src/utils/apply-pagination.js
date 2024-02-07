export function applyPagination(documents, page, rowsPerPage) {
  // Check if documents is not null before calling slice
  if (documents && Array.isArray(documents)) {
    return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  } else {
    // Handle the case where documents is null or not an array
    console.error("Invalid documents array:", documents);
    return [];
  }
}