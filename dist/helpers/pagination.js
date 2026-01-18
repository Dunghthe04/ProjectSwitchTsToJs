"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers = (objectPagination, query, countNumberDocuments) => {
    const page = query.page;
    if (page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;
    objectPagination.totalPage = Math.ceil(countNumberDocuments / objectPagination.limit);
    return objectPagination;
};
exports.default = paginationHelpers;
