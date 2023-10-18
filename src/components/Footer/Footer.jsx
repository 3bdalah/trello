const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 text-center absolute bottom-0 w-full">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Trello App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
