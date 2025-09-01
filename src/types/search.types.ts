interface SearchFilters {
  searchTerm: string;
  status: string[];
  regions: string[];
  types: string[];
  dateRange: [string, string] | null;
}
