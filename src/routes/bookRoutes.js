const express = require('express');

const bookRouter = express.Router(); // This encapsulates all the routings

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Tolstoy',
      read: false,
    },
    {
      title: 'Les Miserables',
      genre: 'Historical Fiction',
      author: 'V Hugo',
      read: false,
    },
    {
      title: 'Book 3',
      genere: 'Fiction',
      author: 'Gui',
      read: false,
    }];

  bookRouter.route('/') // Creates all routes to /books via the app.get below. Everything going to books uses this router.
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Books',
          books,
        },
      );
    });

  bookRouter.route('/:id') // Creates all routes to /books/single
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Book',
          book: books[id],
        },
      );
    });

  return bookRouter;
}

module.exports = router; // This makes bookRouter available to other programs via a "require"
