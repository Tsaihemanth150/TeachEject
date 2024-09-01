// pages/api/logout.js

export default function handler(req, res) {
    // Set the expiration date to one minute ago (for immediate expiration)
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 1);
  
    // Format the expiration date in the correct format for cookies (GMT format)
    const expires = currentDate.toUTCString();
  
    // Clear cookies
    res.setHeader('Set-Cookie', [
      `Token=; expires=${expires}; path=/`, // Clear the Token cookie
      // Add more cookie clearing if needed
    ]);
  
    // Respond with a success message
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
  