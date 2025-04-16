export const metadata = {
    title: "Job Board",
    description: "Post and view jobs",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  
