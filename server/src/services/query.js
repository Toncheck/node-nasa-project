const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0; // Mongo će za parametar 0 vratiti sve, kao da smo mu zadal maksimalan broj stranica koji postoji

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
