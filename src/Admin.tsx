import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Calendar, X } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError('Failed to load contacts');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Submissions</h1>
              <p className="text-gray-600">Total: {contacts.length} messages</p>
            </div>
            <button
              onClick={fetchContacts}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No contact submissions yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <User className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <Mail size={16} />
                          <span>{contact.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="text-gray-400 mt-1" size={20} />
                      <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;

