import fetch from 'node-fetch';

const testWebhook = async () => {
  try {
    const testData = {
      // Form 1 data
      childName: "John Doe Jr",
      childAge: "8",
      childGender: "Male",
      parentName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      
      // Form 2 data
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      specialInstructions: "Loves trains and wants to ask Santa about the North Pole express",
      
      // Form 3 data
      selectedDate: "2024-12-05",
      selectedTime: "11:00 PM",
      packageName: "Premium Santa Call",
      totalAmount: 49.99
    };

    console.log('Sending webhook test data:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3000/api/webhookGHL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testWebhook();
