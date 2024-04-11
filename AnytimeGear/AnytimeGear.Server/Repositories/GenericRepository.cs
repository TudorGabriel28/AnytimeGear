using AnytimeGear.Server.Data;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AnytimeGear.Server.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AnytimeGearServerContext dbContext;

        public GenericRepository(AnytimeGearServerContext context)
        {
            dbContext = context;
        }

        public void Add(T entity)
        {
            dbContext.Add(entity);
        }

        public void Delete(T entity)
        {
            dbContext.Remove(entity);
        }

        public virtual IList<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> expression)
        {
            return dbContext.Set<T>().Where(expression).ToList();
        }

        public virtual IList<T> GetAll()
        {
            return dbContext.Set<T>().ToList();
        }

        public virtual T? GetById(int id)
        {
            return dbContext.Set<T>().Find(id);
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            dbContext.Update(entity);
        }

        public void DeleteRange(IList<T> entities)
        {
            foreach (var item in entities)
            {
                Delete(item);
            }
        }
    }
}
