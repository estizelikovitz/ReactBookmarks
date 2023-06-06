using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactBookmarks.Data
{
    public class Repository
    {
        private string _connectionString;
        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User user)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.PasswordHash = hash;
            using var context = new DataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new DataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void UpdateBookmark(Bookmark bookmark)
        {
            using var context = new DataContext(_connectionString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            using var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {bookmark.Id}");


        }
        public List<TopBookmarks> GetTopBookmarks()
        {
            using var context = new DataContext(_connectionString);
            var bookmarks = context.Bookmarks;
            List<TopBookmarks> tops = new();
            foreach (Bookmark b in bookmarks)
            {
                if (tops.Select(t => t.Url).Contains(b.Url))
                {
                    tops.FirstOrDefault(t => t.Url == b.Url).Count++;
                }
                else
                {
                    tops.Add(new TopBookmarks
                    {
                        Url = b.Url,
                        Count = 1
                    });
                }
            }

            return tops.OrderByDescending(t => t.Count).Take(5).ToList();

        }

        public User Login(string email, string password)
        {
            using var context = new DataContext(_connectionString);
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return null;
            }

            bool isValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return isValid ? user : null;
        }
        public User GetByEmail(string email)
        {
            using var ctx = new DataContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public List<Bookmark> GetBookmarksByUser(int userId)
        {
            using var context = new DataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

    }
}
