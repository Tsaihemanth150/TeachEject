import React from 'react';
import { FaMoneyBillAlt, FaClock, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from './logo.jpeg'; // Import your logo file here

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
});

const generatePDF = (orders) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.section}>
        <Text style={styles.title}>My Orders</Text>
        {orders.map((order, index) => (
          <View key={order._id} style={styles.section}>
            <Text style={styles.title}>Order ID: {order.OrderID}</Text>
            <Text style={styles.text}><FaMoneyBillAlt size={12} style={{ marginRight: 5 }} />Amount Paid: {order.Amount}</Text>
            <Text style={styles.text}><FaClock size={12} style={{ marginRight: 5 }} />Order Status: {order.status}</Text>
            <Text style={styles.text}><FaShieldAlt size={12} style={{ marginRight: 5 }} />Payment Method: {order.paymentMethod}</Text>
            <Text style={styles.text}><FaInfoCircle size={12} style={{ marginRight: 5 }} />Payment Details: {order.paymentDetails}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const InsuranceTable = ({ user }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.orders.map((order, index) => (
          <div key={order._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-2 flex items-center">
                {index % 2 === 0 ? <FaShieldAlt className="text-blue-500 mr-2" /> : <FaInfoCircle className="text-yellow-500 mr-2" />}
                {order.OrderID}
              </h2>
              <div className="flex flex-col mb-2">
                <div className="flex items-center">
                  <FaMoneyBillAlt className="text-gray-500 mr-2" />
                  <p className="text-gray-700">Amount Paid: {order.Amount}</p>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <p className="text-gray-700">Order Status: {order.status}</p>
                </div>
                <div className="flex items-center">
                  <FaShieldAlt className="text-gray-500 mr-2" />
                  <p className="text-gray-700">Payment Method: {order.paymentMethod}</p>
                </div>
                <div className="flex items-center">
                  <FaInfoCircle className="text-gray-500 mr-2" />
                  <p className="text-gray-700">Payment Details: {order.paymentDetails}</p>
                </div>
              </div>
              <PDFDownloadLink document={generatePDF([order])} fileName={`order_${order.OrderID}.pdf`}>
                {({ loading }) =>
                  loading ? 'Generating PDF...' : 'Download PDF'
                }
              </PDFDownloadLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceTable;
