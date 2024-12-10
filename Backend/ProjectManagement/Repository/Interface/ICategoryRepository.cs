using ProjectManagement.Models;

namespace ProjectManagement.Repository.Interface
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAllCategories();
        public Task<Category> GetCategory(int id);

        public Task<bool> AddCategory(Category category);
        public Task<bool> UpdateCategory(Category category);
        public Task<bool> DeleteCategory(int id);
    }
}
