import { apiClient } from "../api/apiClient";

class CategoryService {
  async fetchAll() {
    return await apiClient.get("/Categories");
  }
}

export const categoryService = new CategoryService();
