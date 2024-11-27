
import { useState, useEffect } from 'react';
import { Trash2, Edit, PlusCircle } from 'lucide-react';
import axios from 'axios';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [customerFilter, setCustomerFilter] = useState('');

  const [invoiceForm, setInvoiceForm] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    details: [{ description: '', quantity: 1, unit_price: 0 }],
  });

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/invoices/', {
        params: {
          page: currentPage,
          customer_name: customerFilter.trim(),
        },
      });

      setInvoices(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10) || 1);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    try {
      if (selectedInvoice) {
        await axios.put(
          `http://127.0.0.1:8000/api/invoices/${selectedInvoice.id}/`,
          invoiceForm
        );
      } else {
        await axios.post('http://127.0.0.1:8000/api/invoices/', invoiceForm);
      }
      fetchInvoices();
      resetForm();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/invoices/${id}/`);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const resetForm = () => {
    setSelectedInvoice(null);
    setInvoiceForm({
      invoice_number: '',
      customer_name: '',
      date: '',
      details: [{ description: '', quantity: 1, unit_price: 0 }],
    });
  };

  const addLineItem = () => {
    setInvoiceForm((prev) => ({
      ...prev,
      details: [...prev.details, { description: '', quantity: 1, unit_price: 0 }],
    }));
  };

  useEffect(() => {
    fetchInvoices();
  }, [currentPage, customerFilter]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-12">
        Invoice Management System
      </h1>
      <div className="space-y-8">
        {/* Invoice List */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50">
            <input
              type="text"
              placeholder="Search by Customer"
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-blue-100 to-teal-100">
                <tr>
                  <th className="py-4 px-6 font-semibold text-gray-700">Invoice</th>
                  <th className="py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="py-4 px-6 font-semibold text-gray-700">Total</th>
                  <th className="py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">{invoice.invoice_number}</td>
                    <td className="py-4 px-6">{invoice.customer_name}</td>
                    <td className="py-4 px-6 font-medium">${invoice.total_amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                        >
                          <Edit size={18} className="hover:scale-110 transform transition-transform duration-150" />
                        </button>
                        <button
                          onClick={() => deleteInvoice(invoice.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-150"
                        >
                          <Trash2 size={18} className="hover:scale-110 transform transition-transform duration-150" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between p-6 bg-gradient-to-r from-blue-50 to-teal-50">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-6 py-2 bg-white rounded-lg shadow-sm disabled:opacity-50 hover:shadow-md transition-shadow duration-150 text-gray-700 font-medium"
            >
              Previous
            </button>
            <span className="flex items-center font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-6 py-2 bg-white rounded-lg shadow-sm disabled:opacity-50 hover:shadow-md transition-shadow duration-150 text-gray-700 font-medium"
            >
              Next
            </button>
          </div>
        </div>

        {/* Invoice Form */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={saveInvoice} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Invoice Number"
                value={invoiceForm.invoice_number}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({ ...prev, invoice_number: e.target.value }))
                }
                className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Customer Name"
                value={invoiceForm.customer_name}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({ ...prev, customer_name: e.target.value }))
                }
                className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
              <input
                type="date"
                value={invoiceForm.date}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({ ...prev, date: e.target.value }))
                }
                className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>

            <div className="space-y-4">
              {invoiceForm.details.map((detail, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Description"
                    value={detail.description}
                    onChange={(e) => {
                      const newDetails = [...invoiceForm.details];
                      newDetails[index].description = e.target.value;
                      setInvoiceForm((prev) => ({ ...prev, details: newDetails }));
                    }}
                    className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={detail.quantity}
                    onChange={(e) => {
                      const newDetails = [...invoiceForm.details];
                      newDetails[index].quantity = parseInt(e.target.value, 10);
                      setInvoiceForm((prev) => ({ ...prev, details: newDetails }));
                    }}
                    className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={detail.unit_price}
                    onChange={(e) => {
                      const newDetails = [...invoiceForm.details];
                      newDetails[index].unit_price = parseFloat(e.target.value);
                      setInvoiceForm((prev) => ({ ...prev, details: newDetails }));
                    }}
                    className="p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={addLineItem}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg flex items-center hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <PlusCircle size={20} className="mr-2" />
                Add Item
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {selectedInvoice ? 'Update Invoice' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm text-center">
        Created by Devendra Kumar Sahu
      </footer>
    </div>
  );
};

export default InvoiceManagement;