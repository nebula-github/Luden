using Luden.Domain.Core.Models;
using Luden.Domain.Core.Specifications;

namespace Luden.Domain.Core.Repositories
{
    public interface IBaseRepositoryAsync<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IList<T>> ListAllAsync();
        Task<IList<T>> ListAsync(ISpecification<T> spec);
        Task<T?> FirstOrDefaultAsync(ISpecification<T> spec);
        Task<T> AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        void Update(T entity);
        void UpdateRange(IEnumerable<T> entities);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
        Task<int> CountAsync(ISpecification<T> spec);
    }
}
