using ProjectManagement.Models;

namespace ProjectManagement.Services.Interface
{
    public interface ICategoryService
    {
        Task<bool> AddCategory(Category category);
        Task<bool> UpdateCategory(Category category);
        Task<bool> DeleteCategory(int id);
        Task<Category> GetCategory(int id);
        Task<List<Category>> GetAllCategories();
    }
}
