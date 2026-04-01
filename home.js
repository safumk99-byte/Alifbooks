function filterBooks(category, event) {

  let books = document.querySelectorAll('.product-card');

  books.forEach(book => {

    let bookCategory = book.getAttribute('data-category');

    // debug
    console.log("Book:", bookCategory, "| Click:", category);

    // SAFE CHECK (case ignore)
    if (
      category === 'all' ||
      (bookCategory && bookCategory.toLowerCase().trim() === category.toLowerCase().trim())
    ) {
      book.style.display = '';
    } else {
      book.style.display = 'none'; 
    }

  });

}