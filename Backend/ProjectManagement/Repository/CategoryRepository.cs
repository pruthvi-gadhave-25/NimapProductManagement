using Microsoft.EntityFrameworkCore;
using ProjectManagement.AppDbContext;
using ProjectManagement.Models;
using ProjectManagement.Repository.Interface;

namespace ProjectManagement.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ProductContext _productContext;

        public CategoryRepository(ProductContext productContext)
        {
            _productContext = productContext;
        }
        public async Task<bool> AddCategory(Category category)
        {
            try
            {
                var entityEntry = await _productContext.Categories.AddAsync(category);
                await _productContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteCategory(int id)
        {
            try
            {
                var entity = await _productContext.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);
                if (entity != null)
                {
                    _productContext.Categories.Remove(entity);
                    await _productContext.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async  Task<List<Category>> GetAllCategories()
        {
            try
            {
                return await _productContext.Categories.ToListAsync();
            }
            catch (Exception ex)
            {
                
                return null;
            }
        }

        public async  Task<Category> GetCategory(int id)
        {
            return await _productContext.Categories.FindAsync(id);
        }

        public async Task<bool> UpdateCategory(Category category)
        {
            try
            {
                _productContext.Categories.Update(category);
                await _productContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
              
                return false;
            }
        }
    }
}
