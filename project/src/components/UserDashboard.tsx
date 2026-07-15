import React, { useState } from 'react';
import { Book, RefreshCw, ArrowLeft, Clock, CheckCircle, UserCircle, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', dueDate: '2024-04-10' },
    { id: 2, title: '1984', author: 'George Orwell', dueDate: '2024-04-12' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [borrowForm, setBorrowForm] = useState({ id: '', title: '', author: '', days: '' });
  const [returnForm, setReturnForm] = useState({ id: '', title: '', author: '' });
  const [popupMessage, setPopupMessage] = useState('');

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const calculateRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} day(s) left` : `${Math.abs(diff)} day(s) overdue`;
  };

  const handleBorrow = () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(borrowForm.days));
    const newBook = {
      id: parseInt(borrowForm.id),
      title: borrowForm.title,
      author: borrowForm.author,
      dueDate: formatDate(dueDate),
    };
    setBorrowedBooks([...borrowedBooks, newBook]);
    setBorrowForm({ id: '', title: '', author: '', days: '' });
  };

  const handleReturn = () => {
    const today = new Date();
    const book = borrowedBooks.find((b) => b.id === parseInt(returnForm.id));
    if (book) {
      const due = new Date(book.dueDate);
      const isLate = today > due;
      setBorrowedBooks(borrowedBooks.filter((b) => b.id !== book.id));
      setPopupMessage(isLate ? 'Book returning delayed!' : 'Returned within the time!');
    }
    setReturnForm({ id: '', title: '', author: '' });
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const filteredBooks = borrowedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user?.username}!</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-4">
          <UserCircle size={40} className="text-blue-600" />
          <div>
            <p className="font-semibold">Username: {user?.username}</p>
            <p className="text-sm text-gray-600">Email: {user?.email || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {popupMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          {popupMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-blue-600" />
            Book Status
          </h3>
          <div className="space-y-4">
            {borrowedBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-600">Due: {book.dueDate}</p>
                  <p className="text-sm text-gray-500">
                    {calculateRemainingDays(book.dueDate)}
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <RefreshCw size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <ArrowLeft size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Books */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Search Books</h3>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-4 space-y-2">
            {filteredBooks.map((book) => (
              <div key={book.id} className="text-gray-700">{book.title}</div>
            ))}
          </div>
        </div>

        {/* Borrow a Book */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Book className="text-green-600" />
            Borrow a Book
          </h3>
          <input
            type="text"
            placeholder="Book ID"
            value={borrowForm.id}
            onChange={(e) => setBorrowForm({ ...borrowForm, id: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Book Name"
            value={borrowForm.title}
            onChange={(e) => setBorrowForm({ ...borrowForm, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={borrowForm.author}
            onChange={(e) => setBorrowForm({ ...borrowForm, author: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Days to Return"
            value={borrowForm.days}
            onChange={(e) => setBorrowForm({ ...borrowForm, days: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            onClick={handleBorrow}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Borrow
          </button>
        </div>

        {/* Return a Book */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="text-purple-600" />
            Return a Book
          </h3>
          <input
            type="text"
            placeholder="Book ID"
            value={returnForm.id}
            onChange={(e) => setReturnForm({ ...returnForm, id: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Book Name"
            value={returnForm.title}
            onChange={(e) => setReturnForm({ ...returnForm, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={returnForm.author}
            onChange={(e) => setReturnForm({ ...returnForm, author: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            onClick={handleReturn}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
